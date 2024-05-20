import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/**
 * Exercises class represents an exercise entity in the database.
 * It extends the BaseModel class from AdonisJS Lucid ORM.
 */
export default class Exercises extends BaseModel {
  /**
   * The primary key for the table.
   * @type {number}
   */
  @column({ isPrimary: true })
  declare id: number
  /**
   * The creation timestamp.
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  /**
   * The update timestamp.
   * @type {DateTime}
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  /**
   * The description of the exercise.
   * @type {string}
   */
  @column()
  declare description: string
  /**
   * The name of the exercise.
   * @type {string}
   */
  @column()
  declare name: string

  /**
   * Retrieves all exercise entries from the database.
   * @returns {Promise<Object>} An object containing a message, the retrieved exercise entries, and a status code.
   */
  static async getExercices() {
    const exercices = await Exercises.all()
    if (exercices.length === 0) {
      return { message: 'No exercices found', exercices: exercices, status: 404 }
    }
    return { message: 'Success', exercices: exercices, status: 200 }
  }

  /**
   * Creates a new exercise entry in the database.
   * @param {string} name - The name of the exercise.
   * @param {string} description - The description of the exercise.
   * @returns {Promise<Exercises>} The created exercise entry.
   */
  static async createExercice(name: string, description: string): Promise<Exercises> {
    const exercice = new Exercises()
    exercice.name = name
    exercice.description = description
    await exercice.save()
    return exercice
  }

  /**
   * Retrieves a single exercise entry from the database by its ID.
   * @param {number} id - The ID of the exercise entry.
   * @returns {Promise<Exercises | null>} The retrieved exercise entry or null if not found.
   */
  static async getExercice(id: number): Promise<Exercises | null> {
    return await Exercises.find(id)
  }

  /**
   * Updates an exercise entry in the database by its ID.
   * @param {number} id - The ID of the exercise entry.
   * @param {string} name - The new name of the exercise.
   * @param {string} description - The new description of the exercise.
   * @returns {Promise<Exercises | { error: string }>} The updated exercise entry or an error message if not found.
   */
  static async updateExercice(
    id: number,
    name: string,
    description: string
  ): Promise<Exercises | { error: string }> {
    const exercice = await Exercises.find(id)
    if (!exercice) return { error: 'Exercises not found' }
    if (name !== '' || name !== undefined) exercice.name = name
    if (description !== '' || description !== undefined) exercice.description = description
    await exercice.save()
    return exercice
  }

  /**
   * Deletes an exercise entry from the database by its ID.
   * @param {number} id - The ID of the exercise entry.
   * @returns {Promise<{ message: string } | { error: string }>} A message indicating the result of the deletion operation.
   */
  static async deleteExercice(id: number): Promise<{ message: string } | { error: string }> {
    const exercice = await Exercises.find(id)
    if (!exercice) {
      return { error: 'Exercises not found' }
    }
    await exercice.delete()
    return { message: 'Exercises deleted successfully' }
  }
}
