import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vehicles extends BaseSchema {
  protected tableName = 'vehicles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true })
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.integer('year').notNullable()
      table.decimal('km').notNullable()
      table.string('color').notNullable()
      table.string('vin').notNullable()
      table.decimal('purchase_price').notNullable()
      table.decimal('sold_price')
      table.timestamp('sold_at', { useTz: true })
      table.integer('seller_id').unsigned().references('users.id').onDelete('CASCADE')
      table.enum('status', ['sold', 'reserved', 'available']).defaultTo('available')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
