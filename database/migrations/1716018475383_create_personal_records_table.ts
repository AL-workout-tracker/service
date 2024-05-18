import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PersonalRecords extends BaseSchema {
  protected tableName = 'personal_records'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('exercise_id').unsigned().notNullable().references('id').inTable('exercises').onDelete('CASCADE')
      table.decimal('record', 10, 2).notNullable()
      table.date('date').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
