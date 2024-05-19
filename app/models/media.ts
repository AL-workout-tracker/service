import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare mediaType: string

  @column()
  declare url: string

  @column({ isPrimary: false })
  declare exerciceId: number

  async createMedia(mediaType: string, url: string, exerciceId: number) {
    const media = new Media()
    media.mediaType = mediaType
    media.url = url
    media.exerciceId = exerciceId
    await media.save()
    return media
  }

  static async getMedias() {
    return await Media.all()
  }

  static async getMedia(id: number) {
    return await Media.find(id)
  }

  static async updateMedia(id: number, mediaType: string, url: string, exerciceId: number) {
    const media = await Media.find(id)
    if (media === null) {
      return { error: 'Media not found' }
    }
    media.mediaType = mediaType
    media.url = url
    media.exerciceId = exerciceId
    await media.save()
    return media
  }

  static async deleteMedia(id: number) {
    const media = await Media.find(id)
    if (media === null) {
      return { error: 'Media not found' }
    }
    await media.delete()
  }
}
