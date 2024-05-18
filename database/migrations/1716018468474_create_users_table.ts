import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 50).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password_hash', 255).notNullable()
      table.string('first_name', 50)
      table.string('last_name', 50)
      table.string('profile_picture', 255)
      table.text('bio')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
