import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, beforeFind } from '@ioc:Adonis/Lucid/Orm'
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

  @column.dateTime()
  public soldAt: DateTime

  @column()
  public sellerId: number

  @hasOne(() => User, { foreignKey: 'seller_id' })
  public seller: HasOne<typeof User>

  @column()
  public status: 'sold' | 'reserved' | 'available'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
