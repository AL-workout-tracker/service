import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Exercises extends BaseSchema {
  protected tableName = 'exercises'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.text('description')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
