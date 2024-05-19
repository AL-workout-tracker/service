import { BaseSchema } from '@adonisjs/lucid/schema'

export default class WorkoutExercises extends BaseSchema {
  protected tableName = 'workout_exercises'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onDelete('CASCADE')
      table
        .integer('exercise_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('exercises')
        .onDelete('CASCADE')
      table.integer('sets').notNullable()
      table.integer('reps').notNullable()
      table.decimal('weight', 5, 2)
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
