import Customer from '#models/customer'
import CustomerDto from './customer.dto.js'
import SaleDto from './sales.dto.js'

export default class CustomerShowDto {
  static create(customerModel: Customer, sales?: SaleDto[]) {
    const { id, name, cpf, email, phone, street, city, state, postalCode, country } = customerModel
    return new CustomerDto(
      name,
      cpf,
      email,
      phone,
      street,
      city,
      state,
      postalCode,
      country,
      id,
      sales
    )
  }
}
