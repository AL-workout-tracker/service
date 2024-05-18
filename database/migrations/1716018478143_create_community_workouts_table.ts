import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CommunityWorkouts extends BaseSchema {
  protected tableName = 'community_workouts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('title', 100).notNullable()
      table.text('description')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
