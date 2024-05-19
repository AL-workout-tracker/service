/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

///////////////////////// HOME //////////////////////////
/**
 * Handles GET requests to /.
 * This route returns all available routes.
 * @TODO: Remove this route in production and add an authentication middleware to secure the API.
 */
router.get('/', async ({ response }) => {
  response.send(router.toJSON())
})

///////////////////////// EXERCICES //////////////////////////
// @ts-ignore
const ExercicesController = () => import('#controllers/exercices_controller')

router.get('/api/exercices', [ExercicesController, 'index'])
