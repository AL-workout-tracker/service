import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare password_hash: string

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare profile_picture: string

  @column()
  declare bio: string
}
