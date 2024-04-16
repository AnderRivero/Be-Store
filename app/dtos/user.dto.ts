export default class UserDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserDto?] {
    const { email, password } = object
    const regularExps = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!email) return ['Missing email']
    if (!password) return ['Missing password']
    if (!regularExps.test(email)) return ['Email is not valid']
    if (password.length < 6) return ['Password too short']

    return [undefined, new UserDto(email, password)]
  }
}
