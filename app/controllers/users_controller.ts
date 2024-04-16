import type { HttpContext } from '@adonisjs/core/http'
import UserDto from '../dtos/user.dto.js'
import { AuthService } from '#services/auth_service'

export default class UsersController {
  constructor() {}

  async login({ request, response }: HttpContext) {
    console.log('userLogin')

    const [error, userDto] = UserDto.create(request.body())
    if (error) {
      return response.status(400).json({ error })
    }

    try {
      const authService = new AuthService()
      const user = await authService.loginUser(userDto!)
      response.status(201).json(user)
    } catch (errorService) {
      response.status(400).json({ error: errorService })
    }
  }

  async create({ request, response }: HttpContext) {
    const [error, userDto] = UserDto.create(request.body())
    if (error) {
      return response.status(400).json({ error })
    }

    try {
      const authService = new AuthService()
      const user = await authService.createUser(userDto!)
      response.status(201).json(user)
    } catch (errorService) {
      response.status(400).json({ error: errorService })
    }
  }
}
