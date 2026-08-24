import { Layer } from 'effect'

import { PostServiceLayer } from '@/modules/post/infratructure/services/post.service'
import { PostHttp } from '@/modules/post/presentation/http/post.http'

export class PostModule {
  public static create() {
    return {
      name: 'post',

      http: PostHttp.pipe(Layer.provide(PostServiceLayer)),
    }
  }
}
