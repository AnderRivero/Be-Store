import User from '#models/user'
import { JwtGenerator } from '../config/jwt.adapter.js'
import UserDto from '../dtos/user.dto.js'
import hash from '@adonisjs/core/services/hash'

export class AuthService {
  async createUser(userDto: UserDto) {
    const existUser = await User.findBy({ email: userDto.email })
    if (existUser) throw 'Email already exist'

    try {
      userDto.password = await hash.make(userDto.password)
      const user = await User.create(userDto!)

      const { password, ...userEntity } = userDto
      const token = await this.generateToken(user)
      return { user: userEntity, token: token }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async loginUser(userDto: UserDto) {
    const userModel = await User.findBy({ email: userDto.email })
    if (!userModel) throw new Error('Email already exist')

    const isMatchPassword = await hash.verify(userModel.password, userDto.password)

    if (!isMatchPassword) throw new Error('Credentials are not correct')

    const { password, updatedAt, ...user } = userModel.$original

    const token = await this.generateToken(user)

    return { user: user, token }
  }

  private async generateToken(user: any) {
    const token = await JwtGenerator.generateToken({ id: user.id })
    if (!token) throw new Error('Error while creating JWT')
    return token
  }
}
