/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/UsersController')

router.post('/users', [UsersController, 'store'])
router.post('/login', [UsersController, 'login'])
