import { HttpContext } from '@adonisjs/core/http'
import Exercises from '#models/exercises'
import { createExerciseValidator, updateExerciseValidator } from '#validators/exercises'

/**
 * ExercicesController is a class that handles HTTP requests related to exercises.
 * It includes methods for listing, creating, showing, updating, and deleting exercises.
 */
export default class ExercicesController {
  /**
   * Handles GET requests to /exercises.
   * Returns a list of all exercises.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async index({ response }: HttpContext) {
    const result = await Exercises.getAll()
    response.status(result.status).json(result)
  }

  /**
   * Handles POST requests to /exercises.
   * Creates a new exercise.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createExerciseValidator)
      const result = await Exercises.createExercise(payload.name, payload.description)
      response.status(result.status).json(result)
    } catch (error) {
      response
        .status(400)
        .json({ message: 'Validation failed', errors: error.messages, status: 400 })
    }
  }

  /**
   * Handles GET requests to /exercises/:id.
   * Returns a single exercise.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async show({ params, response }: HttpContext) {
    const result = await Exercises.getById(params.id)
    response.status(result.status).json(result)
  }

  /**
   * Handles PUT requests to /exercises/:id.
   * Updates an existing exercise.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async update({ params, request, response }: HttpContext) {
    if (!params.id) return response.status(400).json({ message: 'Missing ID', status: 400 })
    if (!request.hasBody()) {
      return response.status(400).json({ message: 'Missing body', status: 400 })
    }
    try {
      const payload = await request.validateUsing(updateExerciseValidator)
      if (payload.name === undefined && payload.description === undefined) {
        return response.status(400).json({ message: 'No data to update', status: 400 })
      }
      const result = await Exercises.updateExercise({
        id: params.id,
        name: payload.name,
        description: payload.description,
      })
      response.status(result.status).json(result)
    } catch (error) {
      response
        .status(400)
        .json({ message: 'Validation failed', errors: error.messages, status: 400 })
    }
  }

  /**
   * Handles DELETE requests to /exercises/:id.
   * Deletes an existing exercise.
   */
  async destroy({ params, response }: HttpContext) {
    if (!params.id) return response.status(400).json({ message: 'Missing ID', status: 400 })
    const result = await Exercises.deleteExercise(params.id)
    response.status(result.status).json(result)
  }
}
