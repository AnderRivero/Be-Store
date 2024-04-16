import SaleDto from './sales.dto.js'

export default class CustomerDto {
  constructor(
    public name: string,
    public cpf: string,
    public email: string,
    public phone: string,
    public street: string,
    public city: string,
    public state: string,
    public postalCode: string,
    public country: string,
    public id?: number,
    public sales?: SaleDto[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CustomerDto?] {
    const { name, cpf, email, phone, street, city, state, postalCode, country } = object
    const regularExps = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!name) return ['Missing name']
    if (!cpf) return ['Missing cpf']
    if (!email) return ['Missing email']
    if (!phone) return ['Missing phone']
    if (!street) return ['Missing street']
    if (!city) return ['Missing city']
    if (!state) return ['Missing state']
    if (!postalCode) return ['Missing postalCode']
    if (!country) return ['Missing country']
    if (!regularExps.test(email)) return ['Email is not valid']

    return [
      undefined,
      new CustomerDto(name, cpf, email, phone, street, city, state, postalCode, country),
    ]
  }
}
