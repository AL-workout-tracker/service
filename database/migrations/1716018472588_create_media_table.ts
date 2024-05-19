import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Media extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('exercise_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('exercises')
        .onDelete('CASCADE')
      table.enum('media_type', ['image', 'gif']).notNullable()
      table.string('url', 255).notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
