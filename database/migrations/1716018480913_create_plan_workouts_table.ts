import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PlanWorkouts extends BaseSchema {
  protected tableName = 'plan_workouts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('plan_id').unsigned().notNullable().references('id').inTable('workout_plans').onDelete('CASCADE')
      table.integer('workout_id').unsigned().notNullable().references('id').inTable('workouts').onDelete('CASCADE')
      table.date('scheduled_date').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
