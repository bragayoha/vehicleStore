import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public year: number

  @column()
  public km: number

  @column()
  public color: string

  @column()
  public vin: string

  @column()
  public purchasePrice: number

  @column()
  public soldPrice: number

  @column.dateTime({ serialize: (value) => value.toFormat('dd/MM/yyyy') })
  public soldAt: DateTime

  @column()
  public sellerId: number

  @hasOne(() => User, { foreignKey: 'seller_id' })
  public seller: HasOne<typeof User>

  @column()
  public status: 'sold' | 'reserved' | 'available'

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toFormat('dd/MM/yyyy') })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value.toFormat('dd/MM/yyyy'),
  })
  public updatedAt: DateTime
}
