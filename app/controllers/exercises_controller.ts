import { HttpContext } from '@adonisjs/core/http'
import Exercises from '#models/exercises'
import { createExerciseValidator, updateExerciseValidator } from '#validators/exercises'

/**
 * ExercicesController is a class that handles HTTP requests related to exercices.
 * It includes methods for listing, creating, showing, updating, and deleting exercices.
 */
export default class ExercicesController {
  /**
   * Handles GET requests to /exercices.
   * Returns a list of all exercices.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async index({ response }: HttpContext) {
    const result = await Exercises.getExercises()
    response.status(result.status).json(result)
  }

  /**
   * Handles POST requests to /exercices.
   * Creates a new exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createExerciseValidator)
    if ('errors' in payload) {
      return { message: 'Validation failed', errors: payload.errors, status: 400 }
    }
    const result = await Exercises.createExercise(payload.name, payload.description)
    response.status(result.status).json(result)
  }

  /**
   * Handles GET requests to /exercices/:id.
   * Returns a single exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async show({ params, response }: HttpContext) {
    const result = await Exercises.getExercise(params.id)
    response.status(result.status).json(result)
  }

  /**
   * Handles PUT requests to /exercices/:id.
   * Updates an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async update({ params, request, response }: HttpContext) {
    if (!params.id) return response.status(400).json({ message: 'Missing ID', status: 400 })
    if (!request.hasBody()) {
      return response.status(400).json({ message: 'Missing body', status: 400 })
    }
    const payload = await request.validateUsing(updateExerciseValidator)
    if ('errors' in payload) {
      return { message: 'Validation failed', errors: payload.errors, status: 400 }
    }
    if (payload.name === undefined && payload.description === undefined) {
      return response.status(400).json({ message: 'No data to update', status: 400 })
    }
    const result = await Exercises.updateExercise({
      id: params.id,
      name: payload.name,
      description: payload.description,
    })
    return response.status(result.status).json(result)
  }

  /**
   * Handles DELETE requests to /exercices/:id.
   * Deletes an existing exercice.
   */
  async destroy({ params, response }: HttpContext) {
    if (!params.id) return response.status(400).json({ message: 'Missing ID', status: 400 })
    const result = await Exercises.deleteExercise(params.id)
    return response.status(result.status).json(result)
  }
}
