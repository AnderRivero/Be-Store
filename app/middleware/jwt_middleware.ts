import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { JwtGenerator } from '../config/jwt.adapter.js'
export default class JwtMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authorization = ctx.request.header('Authorization')

    if (!authorization) {
      return ctx.response.status(401).json({ error: 'No token provided' })
    }
    if (!authorization.startsWith('Bearer ')) {
      return ctx.response.status(401).json({ error: 'Invalid Bearer token' })
    }

    try {
      const token = authorization.split(' ').at(1) || ''

      const payload = await JwtGenerator.validateToken<{ id: string }>(token)
      if (!payload) return ctx.response.status(401).json({ error: 'Invalid token' })

      return next()
    } catch (error) {
      console.error(error)
      return ctx.response.status(500).json({ error: 'Internal server' })
    }
  }
}
