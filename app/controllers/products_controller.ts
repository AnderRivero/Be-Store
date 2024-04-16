import type { HttpContext } from '@adonisjs/core/http'
import ProductDto from '../dtos/product.dto.js'
import { ProductService } from '#services/product_service'

export default class ProductsController {
  productService = new ProductService()
  async index() {
    const products = await this.productService.findAll()
    return products || []
  }
  async store({ request, response }: HttpContext) {
    const [error, productDto] = ProductDto.create(request.body())
    if (error) {
      return response.status(400).json({ error })
    }

    try {
      const { product } = await this.productService.create(productDto!)
      response.status(201).json(product)
    } catch (errorService) {
      console.log(errorService)
      return response.status(400).json({ error: errorService })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const product = await this.productService.findOne(request.param('id'))
      return product
    } catch (error) {
      response.status(400).json({ error })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const isOk = await this.productService.update(request.param('id'), request.body())
      return { message: isOk ? 'Product update success' : 'Product not found' }
    } catch (error) {
      response.status(400).json({ error })
    }
  }
  async destroy({ request, response }: HttpContext) {
    try {
      const { isActive, createdAt, ...product } = await this.productService.destroy(
        request.param('id')
      )
      return { product: product, message: 'Product delete success' }
    } catch (error) {
      return response.status(400).json({ error: 'Product id not found' })
    }
  }
}
