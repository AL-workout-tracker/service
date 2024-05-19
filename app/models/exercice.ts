import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Exercice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare description: string

  static async createExercice(description: string) {
    const exercice = new Exercice()
    exercice.description = description
    await exercice.save()
    return exercice
  }

  static async getExercices() {
    return await Exercice.all()
  }

  static async getExercice(id: number) {
    return await Exercice.find(id)
  }

  static async updateExercice(id: number, description: string) {
    const exercice = await Exercice.find(id)
    if (exercice === null) {
      return { error: 'Exercice not found' }
    }
    exercice.description = description
    await exercice.save()
    return exercice
  }

  static async deleteExercice(id: number) {
    const exercice = await Exercice.find(id)
    if (exercice === null) {
      return { error: 'Exercice not found' }
    }
    await exercice.delete()
  }
}
