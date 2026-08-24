import * as Layer from 'effect/Layer'
import * as ManagedRuntime from 'effect/ManagedRuntime'

import { ApiClient } from '@/lib/api-client'

const layer = Layer.mergeAll(ApiClient.layer)
export const runtime = ManagedRuntime.make(layer)
