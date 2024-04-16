import Customer from '#models/customer'
import Sale from '#models/sale'
import CustomerDto from '../dtos/customer.dto.js'
import CustomerShowDto from '../dtos/customer.show.dto.js'
import SaleShowDto from '../dtos/sale.show.dto.js'
import { getMonthDates } from '../utils/util.js'

export class CustomerService {
  async create(userDto: CustomerDto) {
    const existCustomer = await Customer.findBy({ cpf: userDto.cpf })
    if (existCustomer) throw 'Customer already exist'

    try {
      const customer = await Customer.create(userDto!)
      return { user: CustomerShowDto.create(customer) }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async update(customerId: number, body: { [key: string]: any }) {
    const { id, cpf, ...customerToUpdate } = body

    const customerUpdated = await Customer.query().where('id', customerId).update(customerToUpdate)
    return customerUpdated.at(0)
  }

  async findAll() {
    const result = await Customer.all()

    const customers = result.toReversed().map((customer) => {
      const { id, cpf, name, email } = CustomerShowDto.create(customer)
      return { id, cpf, name, email }
    })

    return customers
  }

  async findOne(id: number, date?: string) {
    const result = await Customer.findBy({ id })
    if (!result) throw 'Customer not found'

    let sales
    if (!date) {
      sales = await Sale.query().where({ customerId: id }).orderBy('date', 'desc')
    } else {
      const monthAndYear = date.split('-')
      const datesOfMonth = getMonthDates(monthAndYear.at(0)!, monthAndYear.at(1)!)
      sales = await Sale.query()
        .where({ customerId: id })
        .whereBetween('date', [datesOfMonth.firstDate, datesOfMonth.lastDate])
        .orderBy('date', 'desc')
    }

    const salesDto = sales.map((sale) => SaleShowDto.create(sale))

    const customer = CustomerShowDto.create(result, salesDto)

    return customer
  }

  async destroy(id: number) {
    const customer = await Customer.findOrFail(id)
    await customer.delete()
    return customer
  }
}
