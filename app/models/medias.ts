import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import Exercises from '#models/exercises'

/**
 * Medias class represents a media entity in the database.
 * It extends the BaseModel class from AdonisJS Lucid ORM.
 */
export default class Medias extends BaseModel {
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
   * The type of the media.
   * @type {string}
   */
  @column()
  declare mediaType: string

  /**
   * The URL of the media.
   * @type {string}
   */
  @column()
  declare url: string

  /**
   * The ID of the associated exercise.
   * @type {number}
   */
  @column()
  declare exerciseId: number

  /**
   * Retrieves all media entries from the database.
   */
  static async getAll(): Promise<{
    message: string
    objects?: Medias[]
    status: number
    error?: string
  }> {
    try {
      const medias = await Medias.all()
      if (medias.length === 0) {
        return { message: 'No medias found', status: 404 }
      }
      return { message: 'Medias retrieved successfully', objects: medias, status: 200 }
    } catch (error) {
      return { message: 'Error retrieving medias', error: error.message, status: 500 }
    }
  }

  /**
   * Retrieves a single media entry from the database by its ID.
   * @param {number} id - The ID of the media entry.
   */
  static async getById(
    id: number
  ): Promise<{ message: string; object?: Medias; status: number; error?: string }> {
    try {
      const media = await Medias.find(id)
      if (!media) {
        return { message: 'Media not found', status: 404 }
      }
      return { message: 'Media retrieved successfully', object: media, status: 200 }
    } catch (error) {
      return { message: 'Error retrieving media', error: error.message, status: 500 }
    }
  }

  /**
   * Creates a new media entry in the database.
   * @param {string} mediaType - The type of the media.
   * @param {string} url - The URL of the media.
   * @param {number} exerciseId - The ID of the associated exercise.
   */
  static async createMedia(
    mediaType: string,
    url: string,
    exerciseId: number
  ): Promise<{ message: string; object?: Medias; status: number; error?: string }> {
    try {
      const media = new Medias()
      media.mediaType = mediaType
      media.url = url
      media.exerciseId = exerciseId

      const exercise = await Exercises.find(exerciseId)
      if (!exercise) return { message: 'Exercise not found', status: 404 }
      await media.save()
      return {
        message: 'Media created successfully',
        object: media,
        status: 201,
      }
    } catch (error) {
      return { message: 'Error creating media', error: error.message, status: 500 }
    }
  }

  /**
   * Updates a media entry in the database by its ID.
   * @param {Object} params - The parameters for updating the media.
   * @param {number} params.id - The ID of the media entry.
   * @param {string} [params.mediaType] - The new type of the media.
   * @param {string} [params.url] - The new URL of the media.
   * @param {number} [params.exerciseId] - The new ID of the associated exercise.
   */
  static async updateMedia({
    id,
    mediaType,
    url,
    exerciseId,
  }: {
    id: number
    mediaType?: string
    url?: string
    exerciseId?: number
  }): Promise<{ message: string; object?: Medias; status: number; error?: string }> {
    try {
      const media = await Medias.find(id)
      if (!media) return { message: 'Media not found', status: 404 }

      if (mediaType !== undefined) media.mediaType = mediaType
      if (url !== undefined) media.url = url
      if (exerciseId !== undefined) media.exerciseId = exerciseId
      media.updatedAt = DateTime.utc()
      await media.save()
      return {
        message: 'Media updated successfully',
        object: media,
        status: 200,
      }
    } catch (error) {
      return { message: 'Error updating media', error: error.message, status: 500 }
    }
  }

  /**
   * Deletes a media entry from the database by its ID.
   * @param {number} id - The ID of the media entry.
   */
  static async deleteMedia(
    id: number
  ): Promise<{ message: string; object?: Medias; status: number; error?: string }> {
    try {
      const media = await Medias.find(id)
      if (!media) return { message: 'Media not found', status: 404 }
      await media.delete()
      return { message: 'Media deleted successfully', object: media, status: 200 }
    } catch (error) {
      return { message: 'Error deleting media', error: error.message, status: 500 }
    }
  }
}
