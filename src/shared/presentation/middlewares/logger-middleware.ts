import { createMiddleware } from 'hono/factory'
import { logger } from '@/shared/infrastructure/logging/logger'

export const pinoLogger = () =>
    createMiddleware(async (c, next) => {
        const start = Date.now()
        const { method, path } = c.req

        // Log request
        logger.info({ msg: 'Incoming request', method, path })

        await next()

        const end = Date.now()
        const duration = `${end - start}ms`
        const { status } = c.res

        // Log response
        if (status >= 400) {
            logger.error({ msg: 'Request failed', method, path, status, duration })
        } else {
            logger.info({ msg: 'Request completed', method, path, status, duration })
        }
    })
