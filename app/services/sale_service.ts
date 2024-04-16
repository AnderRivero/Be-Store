import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import SaleShowDto from '../dtos/sale.show.dto.js'
import SaleDto from '../dtos/sales.dto.js'

export class SaleService {
  async create(saleDto: SaleDto) {
    const product = await Product.findBy({ id: saleDto.productId })
    if (!product) throw 'Product not found'

    const customer = await Customer.findBy({ id: saleDto.customerId })
    if (!customer) throw 'Customer not found'

    this.completeSale(saleDto, product)

    try {
      const sale = await Sale.create(saleDto!)
      return { sale: SaleShowDto.create(sale) }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  private completeSale(saleDto: SaleDto, product: Product) {
    saleDto.unitaryPrice = product.price
    saleDto.totalPrice = product.price * saleDto.quantity
  }
}
