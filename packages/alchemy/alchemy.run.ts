import Api from '@raco/api'
import * as Alchemy from 'alchemy'
import * as Cloudflare from 'alchemy/Cloudflare'
import * as GitHub from 'alchemy/GitHub'
import * as Output from 'alchemy/Output'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'

export default Alchemy.Stack(
  'raco',
  {
    providers: Layer.merge(Cloudflare.providers(), GitHub.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const github = yield* GitHub.GitHubEnv

    const api = yield* Api
    const web = yield* Cloudflare.Website.Vite('web', {
      rootDir: '../../apps/web',
      compatibility: { flags: ['nodejs_compat'] },
      viteEnvironments: {
        entry: 'rsc',
        children: ['ssr'],
      },
      env: {
        VITE_API_URL: api.url.as<string>(),
      },
    })

    if (github?.pr)
      yield* GitHub.Comment('preview', {
        owner: github.owner,
        repository: github.repository,
        issueNumber: github.pr,
        body: Output.interpolate`
          ### Preview

          - **API**: [${api.url}](${api.url})
          - **Web**: [${web.url}](${web.url})

          Built from commit ${github.sha.slice(0, 7)}

          ---
          _This comment updates automatically with each push._
        `,
      })

    return {
      api: api.url,
      web: web.url,
    }
  })
)
