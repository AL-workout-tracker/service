import {DateTime} from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'

/**
 * Exercises class represents an exercise entity in the database.
 * It extends the BaseModel class from AdonisJS Lucid ORM.
 */
export default class Exercises extends BaseModel {
  /**
   * The primary key for the table.
   * @type {number}
   */
  @column({isPrimary: true})
  declare id: number

  /**
   * The creation timestamp.
   * @type {DateTime}
   */
  @column.dateTime({autoCreate: true})
  declare createdAt: DateTime

  /**
   * The update timestamp.
   * @type {DateTime}
   */
  @column.dateTime({autoCreate: true, autoUpdate: true})
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
   */
  static async getAll(): Promise<{
    message: string
    objects?: Exercises[]
    status: number
    error?: string
  }> {
    try {
      const exercises = await Exercises.all()
      if (exercises.length === 0) {
        return {message: 'No exercises found', status: 404}
      }
      return {message: 'Exercises retrieved successfully', objects: exercises, status: 200}
    } catch (error) {
      return {message: 'Error retrieving exercises', error: error.message, status: 500}
    }
  }

  /**
   * Retrieves a single exercise entry from the database by its ID.
   * @param {number} id - The ID of the exercise entry.
   */
  static async getById(
    id: number
  ): Promise<{ message: string; object?: Exercises; status: number; error?: string }> {
    try {
      const exercise = await Exercises.find(id)
      if (!exercise) {
        return {message: 'Exercise not found', status: 404}
      }
      return {message: 'Exercise retrieved successfully', object: exercise, status: 200}
    } catch (error) {
      return {message: 'Error retrieving exercise', error: error.message, status: 500}
    }
  }

  /**
   * Creates a new exercise entry in the database.
   * @param {string} name - The name of the exercise.
   * @param {string} description - The description of the exercise.
   */
  static async createExercise(
    name: string,
    description: string
  ): Promise<{ message: string; object?: Exercises; status: number; error?: string }> {
    try {
      const exercise = new Exercises()
      exercise.name = name
      exercise.description = description
      await exercise.save()
      return {
        message: 'Exercise created successfully',
        object: exercise,
        status: 201,
      }
    } catch (error) {
      return {message: 'Error creating exercise', error: error.message, status: 500}
    }
  }

  /**
   * Updates an exercise entry in the database by its ID.
   * @param {Object} params - The parameters for updating the exercise.
   * @param {number} params.id - The ID of the exercise entry.
   * @param {string} params.name - The new name of the exercise.
   * @param {string} params.description - The new description of the exercise.
   */
  static async updateExercise({
                                id,
                                name,
                                description,
                              }: {
    id: number
    name?: string
    description?: string
  }): Promise<{ message: string; object?: Exercises; status: number; error?: string }> {
    try {
      const exercise = await Exercises.find(id)
      if (!exercise) return {message: 'Exercise not found', status: 404}

      if (name !== undefined) exercise.name = name
      if (description !== undefined) exercise.description = description
      exercise.updatedAt = DateTime.now()
      await exercise.save()
      return {
        message: 'Exercise updated successfully',
        object: exercise,
        status: 200,
      }
    } catch (error) {
      return {message: 'Error updating exercise', error: error.message, status: 500}
    }
  }

  /**
   * Deletes an exercise entry from the database by its ID.
   * @param {number} id - The ID of the exercise entry.
   */
  static async deleteExercise(
    id: number
  ): Promise<{ message: string; object?: Exercises; status: number; error?: string }> {
    try {
      const exercise = await Exercises.find(id)
      if (!exercise) return {message: 'Exercise not found', status: 404}
      await exercise.delete()
      return {message: 'Exercise deleted successfully', object: exercise, status: 200}
    } catch (error) {
      return {message: 'Error deleting exercise', error: error.message, status: 500}
    }
  }
}
