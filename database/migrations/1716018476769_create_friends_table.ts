import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Friends extends BaseSchema {
  protected tableName = 'friends'

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
      table
        .integer('friend_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamps(true)
      table.unique(['user_id', 'friend_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
