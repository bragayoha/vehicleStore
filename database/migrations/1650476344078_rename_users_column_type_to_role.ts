import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('type', 'role')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {})
  }
}
