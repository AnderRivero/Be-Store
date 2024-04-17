import Product from '#models/product'
import ProductDto from '../dtos/product.dto.js'
import ProductShowDto from '../dtos/product.show.dto.js'

export class ProductService {
  async create(productDto: ProductDto) {
    const existProduct = await Product.findBy({ name: productDto.name })
    if (existProduct) throw 'Product already exist'

    try {
      const product = await Product.create(productDto!)
      return { product: ProductShowDto.create(product) }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async findAll() {
    const result = await Product.query().where({ isActive: true }).orderBy('name', 'asc')

    const customers = result.map((customer) => {
      const { id, name, price } = ProductShowDto.create(customer)
      return { id, name, price }
    })

    return customers
  }

  async findOne(id: number) {
    const result = await Product.findBy({ id })
    if (!result) throw 'Product not found'

    return ProductShowDto.create(result)
  }

  async destroy(productId: number) {
    const product = await Product.findOrFail(productId)
    product.isActive = false
    await product.save()

    const { id, name, price, isActive, createdAt } = product
    return { id, name, price, isActive, createdAt }
  }

  async update(productId: number, body: { [key: string]: any }) {
    const { id, isActive, ...productToUpdate } = body

    const productUpdated = await Product.query().where('id', productId).update(productToUpdate)
    return productUpdated.at(0)
  }
}
