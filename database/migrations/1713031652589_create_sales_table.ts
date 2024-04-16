import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE') // delete post when user is deleted
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE') // delete post when user is deleted
      table.integer('quantity')
      table.date('date')
      table.float('unitary_price')
      table.float('total_price')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
