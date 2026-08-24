import * as Alchemy from 'alchemy'
import * as Cloudflare from 'alchemy/Cloudflare'
import * as Drizzle from 'alchemy/Drizzle'
import * as Neon from 'alchemy/Neon'
import * as Effect from 'effect/Effect'

export const NeonDB = Effect.gen(function* () {
  const { stage } = yield* Alchemy.Stack

  const migrations = yield* Drizzle.Schema('schema', {
    schema:
      '../../apps/api/src/shared/infrastructure/persistent/drizzle/drizzle.schema.ts',
    out: './migrations',
  })

  const project = stage.startsWith('pr-')
    ? yield* Neon.Project.ref('database', { stage: `staging-${stage}` })
    : yield* Neon.Project('database', { region: 'aws-ap-southeast-1' })

  const branch = yield* Neon.Branch('branch', { project, migrations })

  return { project, branch, migrations }
})

export const Hyperdrive = Effect.gen(function* () {
  const { branch } = yield* NeonDB

  return yield* Cloudflare.Hyperdrive.Connection('hyperdrive', {
    origin: branch.origin,
  })
})
