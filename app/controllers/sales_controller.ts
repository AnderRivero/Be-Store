import type { HttpContext } from '@adonisjs/core/http'
import SaleDto from '../dtos/sales.dto.js'
import { SaleService } from '#services/sale_service'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const [error, productDto] = SaleDto.create(request.body())
    if (error) {
      return response.status(400).json({ error })
    }

    try {
      const saleService = new SaleService()
      const { sale } = await saleService.create(productDto!)
      response.status(201).json(sale)
    } catch (errorService) {
      console.log(errorService)
      return response.status(400).json({ error: errorService })
    }
  }
}
