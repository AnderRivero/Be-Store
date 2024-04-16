import Product from '#models/product'
import ProductDto from './product.dto.js'

export default class ProductShowDto {
  static create(customerModel: Product) {
    const { id, name, price, isActive } = customerModel
    return new ProductDto(name, price, isActive, id)
  }
}
