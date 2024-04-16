import type { HttpContext } from '@adonisjs/core/http'

import CustomerDto from '../dtos/customer.dto.js'
import { CustomerService } from '#services/customer_service'

export default class CustomersController {
  customerService = new CustomerService()
  async index() {
    const customers = await this.customerService.findAll()
    return customers || []
  }

  async update({ request, response }: HttpContext) {
    try {
      const isOk = await this.customerService.update(request.param('id'), request.body())
      return { message: isOk ? 'Customer update success' : 'Customer not found' }
    } catch (error) {
      response.status(400).json({ error })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const customer = await this.customerService.findOne(request.param('id'), request.all().date)
      return customer
    } catch (error) {
      response.status(400).json({ error })
    }
  }

  async store({ request, response }: HttpContext) {
    const [error, customerDto] = CustomerDto.create(request.body())
    if (error) {
      return response.status(400).json({ error })
    }

    try {
      const { user } = await this.customerService.create(customerDto!)
      response.status(201).json(user)
    } catch (errorService) {
      console.log(errorService)
      return response.status(400).json({ error: errorService })
    }
  }

  async destroy({ request, response }: HttpContext) {
    try {
      const customer = await this.customerService.destroy(request.param('id'))
      return { customer, message: 'Customer delete success' }
    } catch (error) {
      return response.status(400).json({ error: 'Customer id not found' })
    }
  }
}
