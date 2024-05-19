import { HttpContext } from '@adonisjs/core/http'

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
  async index({}: HttpContext) {
    // Return a list of all exercices

  }

  /**
   * Handles GET requests to /exercices/create.
   * Returns a form for creating a new exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   */
  async create({}: HttpContext) {}

  /**
   * Handles POST requests to /exercices.
   * Creates a new exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   * @param {Object} request - The HTTP request.
   */
  async store({ request }: HttpContext) {}

  /**
   * Handles GET requests to /exercices/:id.
   * Returns a single exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   * @param {Object} params - The route parameters.
   */
  async show({ params }: HttpContext) {}

  /**
   * Handles GET requests to /exercices/:id/edit.
   * Returns a form for editing an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   * @param {Object} params - The route parameters.
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handles PUT requests to /exercices/:id.
   * Updates an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   * @param {Object} params - The route parameters.
   * @param {Object} request - The HTTP request.
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Handles DELETE requests to /exercices/:id.
   * Deletes an existing exercice.
   *
   * @param {HttpContext} ctx - The HTTP context.
   * @param {Object} params - The route parameters.
   */
  async destroy({ params }: HttpContext) {}
}
