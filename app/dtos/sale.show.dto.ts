import Sale from '#models/sale'
import SaleDto from './sales.dto.js'

export default class SaleShowDto {
  static create(saleModel: Sale) {
    const { customerId, productId, quantity, date, unitaryPrice, totalPrice, id } = saleModel
    return new SaleDto(customerId, productId, quantity, date, unitaryPrice, totalPrice, id)
  }
}
