import jwt from 'jsonwebtoken'
import env from '#start/env'

export class JwtGenerator {
  static async generateToken(payload: any, duration: string = '23h') {
    return new Promise((resolve) => {
      jwt.sign(payload, env.get('JWT_SEED'), { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null)
        resolve(token)
      })
    })
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, env.get('JWT_SEED'), (err, newToken) => {
        if (err) return resolve(null)
        return resolve(newToken as T)
      })
    })
  }
}
