import { HttpContext } from '@adonisjs/core/http'
import Exercises from '#models/exercises'

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
    const result = await Exercises.getExercices()
    response.status(result.status).json(result)
  }

  /**
   * Handles POST requests to /exercices.
   * Creates a new exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async store({ request, response }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])
    const exercice = await Exercises.createExercice(name, description)
    response.status(201).json({
      message: 'Exercice created successfully',
      exercice: exercice,
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
    const exercice = await Exercises.getExercice(params.id)
    if (!exercice) return response.status(404).json({ message: 'Exercice not found', status: 404 })
    response.status(200).json({
      message: 'Returning the exercice...',
      exercice: exercice,
      status: 200,
    })
  }

  /**
   * Handles PUT requests to /exercices/:id.
   * Updates an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async update({ params, request, response }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])
    const result = await Exercises.updateExercice(params.id, name, description)
    if ('error' in result) return response.status(404).json(result)
    response.status(200).json({
      message: 'Exercice updated successfully',
      exercice: result,
      status: 200,
    })
  }

  /**
   * Handles DELETE requests to /exercices/:id.
   * Deletes an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async destroy({ params, response }: HttpContext) {
    const result = await Exercises.deleteExercice(params.id)
    if ('error' in result) return response.status(404).json(result)
    response.status(200).json(result)
  }
}
