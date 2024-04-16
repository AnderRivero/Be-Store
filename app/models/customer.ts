import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Sale from '#models/sale'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column()
  declare email: string

  @column()
  declare phone: string

  @column()
  declare street: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare postalCode: string

  @column()
  declare country: string

  @hasMany(() => Sale)
  declare posts: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
