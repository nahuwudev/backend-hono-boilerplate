import { Hono } from 'hono'
import { config } from '@/config/config'
import { logger } from '@/shared/infrastructure/logging/logger'
import { pinoLogger } from '@/shared/presentation/middlewares/logger-middleware'
import { errorHandler } from '@/shared/presentation/middlewares/error-handler'
import { HealthController } from '@/modules/health/presentation/health-controller'
import { WelcomeController } from '@/modules/welcome/presentation/welcome-controller'
import { NotFoundError } from '@/shared/domain/errors/app-error'

const app = new Hono()

// Global Middlewares
app.use(pinoLogger())

// Routes
app.get('/', WelcomeController.getWelcome)
app.get('/health', HealthController.getHealth)

// Error Handling
app.onError(errorHandler)
app.notFound((c) => {
    throw new NotFoundError(`Route ${c.req.path} not found`)
})

logger.info(`Server starting on port ${config.port}`)

export default {
    port: config.port,
    fetch: app.fetch,
}