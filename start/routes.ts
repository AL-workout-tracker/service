/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// routers pour les utilisateurs
router.post('/users', 'UsersController.store')
router.post('/login', 'UsersController.login')

// routers pour les entraînements
router
  .group(() => {
    router.get('/', 'WorkoutsController.index')
    router.post('/', 'WorkoutsController.store')
    router.get('/:id', 'WorkoutsController.show')
    router.put('/:id', 'WorkoutsController.update')
    router.delete('/:id', 'WorkoutsController.delete')
  })
  .prefix('/workouts')
// .middleware(['auth'])

// routers pour les exercices
router
  .group(() => {
    router.get('/', 'ExercisesController.index')
    router.post('/', 'ExercisesController.store')
    router.get('/:id', 'ExercisesController.show')
    router.put('/:id', 'ExercisesController.update')
    router.delete('/:id', 'ExercisesController.delete')
  })
  .prefix('/exercises')
  // .middleware(['auth_middleware'])
