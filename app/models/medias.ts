import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Medias extends BaseModel {
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
  declare exerciseId: number

  static async getMedias() {
    const medias = await Medias.all()
    if (medias.length === 0) {
      return { message: 'No medias found', medias: medias, status: 404 }
    }
    return { message: 'Success', medias: medias, status: 200 }
  }

  static async createMedia(mediaType: string, url: string, exerciseId: number): Promise<Medias> {
    const media = new Medias()
    media.mediaType = mediaType
    media.url = url
    media.exerciseId = exerciseId
    await media.save()
    return media
  }

  static async getMedia(id: number) {
    const media = await Medias.find(id)
    if (!media) {
      return { message: 'Media not found', media: media, status: 404 }
    }
    return { message: 'Success', media: media, status: 200 }
  }

  static async updateMedia(id: number, mediaType: string, url: string, exerciseId: number) {
    const media = await Medias.find(id)
    if (!media) {
      return { message: 'Media not found', status: 404 }
    }
    if (mediaType !== undefined) media.mediaType = mediaType
    if (url !== undefined) media.url = url
    if (exerciseId !== undefined) media.exerciseId = exerciseId
    await media.save()
    return media
  }

  static async deleteMedia(id: number) {
    const media = await Medias.find(id)
    if (!media) {
      return { message: 'Media not found', status: 404 }
    }
    await media.delete()
    return { message: 'Media deleted successfully', status: 200 }
  }
}
