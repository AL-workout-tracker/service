// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Medias from '#models/medias'

export default class MediasController {
  /**
   * Handles GET requests to /exercices.
   * Returns a list of all exercices.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async index({ response }: HttpContext) {
    const result = await Medias.getMedias()
    response.status(result.status).json(result)
  }

  /**
   * Handles POST requests to /exercices.
   * Creates a new exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async store({ request, response }: HttpContext) {
    const { mediaType, url, exerciseId } = request.only(['mediaType', 'url', 'exerciseId'])
    if (!mediaType || !url || !exerciseId) {
      return response.status(400).json({
        message: 'Please provide a media type, URL, and exercise ID',
        status: 400,
      })
    }
    const media = await Medias.createMedia(mediaType, url, exerciseId)
    response.status(201).json({
      message: 'Media created successfully',
      media: media,
      status: 201,
    })
  }

  /**
   * Handles GET requests to /exercices/:id.
   * Returns a single exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async show({ params, response }: HttpContext) {
    console.log(params.id, response)
  }

  /**
   * Handles PUT requests to /exercices/:id.
   * Updates an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async update({ params, request, response }: HttpContext) {
    console.log(params.id, request, response)
  }

  /**
   * Handles DELETE requests to /exercices/:id.
   * Deletes an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async destroy({ params, response }: HttpContext) {
    console.log(params.id, response)
  }
}
