import { HttpContext } from '@adonisjs/core/http'
import Medias from '#models/medias'
import { createMediaValidator, updateMediaValidator } from '#validators/medias'

export default class MediasController {
  /**
   * Handles GET requests to /medias.
   * Returns a list of all medias.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async index({ response }: HttpContext) {
    const result = await Medias.getAll()
    response.status(result.status).json(result)
  }

  /**
   * Handles POST requests to /medias.
   * Creates a new media.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createMediaValidator)
      const result = await Medias.createMedia(payload.mediaType, payload.url, payload.exerciseId)
      response.status(result.status).json(result)
    } catch (error) {
      response
        .status(400)
        .json({ message: 'Validation failed', errors: error.messages, status: 400 })
    }
  }

  /**
   * Handles GET requests to /medias/:id.
   * Returns a single media.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async show({ params, response }: HttpContext) {
    const result = await Medias.getById(params.id)
    response.status(result.status).json(result)
  }

  /**
   * Handles PUT requests to /medias/:id.
   * Updates an existing media.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async update({ params, request, response }: HttpContext) {
    if (!params.id) return response.status(400).json({ message: 'Missing ID', status: 400 })
    if (!request.hasBody()) {
      return response.status(400).json({ message: 'Missing body', status: 400 })
    }
    try {
      const payload = await request.validateUsing(updateMediaValidator)
      if (Object.keys(payload).length === 0) {
        return response.status(400).json({ message: 'No data to update', status: 400 })
      }
      const result = await Medias.updateMedia({
        id: params.id,
        mediaType: payload.mediaType,
        url: payload.url,
        exerciseId: payload.exerciseId,
      })
      response.status(result.status).json(result)
    } catch (error) {
      response
        .status(400)
        .json({ message: 'Validation failed', errors: error.messages, status: 400 })
    }
  }

  /**
   * Handles DELETE requests to /medias/:id.
   * Deletes an existing media.
   */
  async destroy({ params, response }: HttpContext) {
    if (!params.id) return response.status(400).json({ message: 'Missing ID', status: 400 })
    const result = await Medias.deleteMedia(params.id)
    response.status(result.status).json(result)
  }
}
