import { errors } from '@adonisjs/auth'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction
  protected renderStatusPages = app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_INVALID_CREDENTIALS) {
      return ctx.response
        .status(error.status)
        .send(error.getResponseMessage(error, ctx));
    }
    return super.handle(error, ctx);
  }
}
