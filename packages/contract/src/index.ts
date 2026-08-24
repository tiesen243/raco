import * as HttpApi from 'effect/unstable/httpapi/HttpApi'

import { PostGroup } from '@/post/post.group'

export class Api extends HttpApi.make('api').add(PostGroup) {}
