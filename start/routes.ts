/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

/**
 * Handles GET requests to /.
 * This route returns all available routes.
 * @TODO: Remove this route in production and add an authentication middleware to secure the API.
 */
router.get('/', async ({ response }) => {
  response.send(router.toJSON())
})

router
  .group(() => {
    router.post('register', [UsersController, 'store'])
    router.post('login', [AuthController, 'store'])

    router
      .group(() => {
        router.get('users', [UsersController, 'index'])
      })
      .use(middleware.auth({ guards: ['api'] }))

    router.get('/health', async () => {
      return { status: 'ok' }
    })
    router.get('/version', async () => {
      // let test = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      // return { version: test.version }
    })
  })
  .prefix('/api')
