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

const ExercicesController = () => import('#controllers/exercises_controller')
const MediasController = () => import('#controllers/medias_controller')
router
  .group(() => {
    ///////////////////////// EXERCICES /////////////////////////////
    router
      .group(() => {
        router.get('', [ExercicesController, 'index'])
        router.post('', [ExercicesController, 'store'])
        router.put('/:id', [ExercicesController, 'update'])
        router.delete('/:id', [ExercicesController, 'destroy'])
        router.get('/:id', [ExercicesController, 'show'])
      })
      .prefix('/exercices')
    /////////////////////////////////////////////////////////////////

    ///////////////////////// MEDIAS ////////////////////////////////
    router
      .group(() => {
        router.get('', [MediasController, 'index'])
        router.post('', [MediasController, 'store'])
        router.put('/:id', [MediasController, 'update'])
        router.delete('/:id', [MediasController, 'destroy'])
        router.get('/:id', [MediasController, 'show'])
      })
      .prefix('/medias')
    /////////////////////////////////////////////////////////////////
  })
  .prefix('/api')
