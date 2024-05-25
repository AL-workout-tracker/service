/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import * as fs from 'node:fs'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import * as os from 'node:os'

///////////////////////// HOME //////////////////////////
/**
 * Handles GET requests to /.
 * This route returns all available routes.
 * @TODO: Remove this route in production and add an authentication middleware to secure the API.
 */
router.get('/', async ({ response }) => {
  // List of available routes
  response.send(router.toJSON())
})

const ExercicesController = () => import('#controllers/exercises_controller')
const MediasController = () => import('#controllers/medias_controller')

const routes = [
  { prefix: 'exercises', controller: ExercicesController },
  { prefix: 'medias', controller: MediasController },
]

router
  .group(() => {
    ///////////////////////// HEALTH CHECK //////////////////////////
    router.get('/health', async ({ response }: HttpContext) => {
      try {
        // Check database connection
        await db.rawQuery('SELECT 1')

        // Check external services availability
        const googleStatus = await checkExternalService('https://www.google.com/')
        const localServiceStatus = await checkExternalService('http://localhost:3333/api/version')

        // Check available disk space
        const diskSpace = fs.statSync('/').size

        // Check memory usage
        const memoryUsage = process.memoryUsage()
        const memoryLimit = os.totalmem() * 0.8 // Limit set to 80% of total memory

        // Check application version
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
        const appVersion = packageJson.version

        // Check response time
        const startTime = process.hrtime()
        const endTime = process.hrtime(startTime)
        const responseTime = (endTime[1] / 1000000).toFixed(4) // Time in milliseconds

        // Check server uptime
        const uptime = os.uptime()

        // Success response if all checks pass
        response.status(200).json({
          status: 'ok',
          database: 'connected',
          externalServices: {
            google: googleStatus,
            localService: localServiceStatus,
          },
          diskSpace,
          memoryUsage,
          memoryLimit: (memoryLimit / 1024 ** 3).toFixed(2) + ' GB', // Convert to GB
          appVersion,
          responseTime: `${responseTime} ms`,
          serverUptime: `${(uptime / 3600).toFixed(2)} hours`, // Convert to hours
        })
      } catch (error) {
        // Error response if any check fails
        response.status(500).json({
          status: 'error',
          message: 'Health check failed',
          error: error.message,
        })
      }
    })
    /////////////////////////////////////////////////////////////////

    routes.forEach(({ prefix, controller }) => {
      router
        .group(() => {
          // @ts-ignore
          router.get('', [controller, 'index'])
          // @ts-ignore
          router.post('', [controller, 'store'])
          // @ts-ignore
          router.put('/:id', [controller, 'update'])
          // @ts-ignore
          router.delete('/:id', [controller, 'destroy'])
          // @ts-ignore
          router.get('/:id', [controller, 'show'])
        })
        .prefix(`/${prefix}`)
    })
  })
  .prefix('/api')

// Function to check external service availability
async function checkExternalService(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (response.ok) {
      return 'available'
    } else {
      return 'unavailable'
    }
  } catch {
    return 'unavailable'
  }
}
