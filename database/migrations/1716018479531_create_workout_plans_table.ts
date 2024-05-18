import { BaseSchema } from '@adonisjs/lucid/schema'

export default class WorkoutPlans extends BaseSchema {
  protected tableName = 'workout_plans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('title', 100).notNullable()
      table.text('description')
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
