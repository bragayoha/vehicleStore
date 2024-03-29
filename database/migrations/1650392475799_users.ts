import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true })
      table.string('cpf').notNullable().unique()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('avatar')
      table.text('biography')
      table.string('password').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
