import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Workouts extends BaseSchema {
  protected tableName = 'workouts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.date('date').notNullable()
      table.text('notes')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
