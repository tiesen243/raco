import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

export const ApiResponseSchema = <
  TData extends Schema.Constraint = Schema.withConstructorDefault<Schema.Null>,
  TError extends Schema.Constraint = Schema.withConstructorDefault<Schema.Null>,
>(
  opts: Partial<{
    status: number
    message: string
    dataSchema: TData
    errorSchema: TError
  }> = {}
) =>
  Schema.Struct({
    status: Schema.Number.pipe(
      Schema.withConstructorDefault(Effect.succeed(opts.status ?? 200))
    ),
    message: Schema.String.pipe(
      Schema.withConstructorDefault(Effect.succeed(opts.message ?? 'OK'))
    ),
    data: Schema.NullOr(opts.dataSchema ?? Schema.Null).pipe(
      Schema.withConstructorDefault(Effect.succeed(null))
    ) as unknown as TData,
    error: Schema.NullOr(opts.errorSchema ?? Schema.Null).pipe(
      Schema.withConstructorDefault(Effect.succeed(null))
    ) as unknown as TError,
    timestamp: Schema.Date.pipe(
      Schema.withConstructorDefault(Effect.sync(() => new Date()))
    ),
  })
