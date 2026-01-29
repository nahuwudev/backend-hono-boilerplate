import type { Context } from 'hono'
import { ZodError } from 'zod'
import { AppError } from '@/shared/domain/errors/app-error'
import { logger } from '@/shared/infrastructure/logging/logger'
import { config } from '@/config/config'

export const errorHandler = async (err: Error, c: Context) => {
    if (err instanceof AppError) {
        return c.json(
            {
                success: false,
                error: {
                    code: err.name,
                    message: err.message,
                },
            },
            // @ts-ignore
            err.statusCode
        )
    }

    if (err instanceof ZodError) {
        return c.json(
            {
                success: false,
                error: {
                    code: 'ValidationError',
                    message: 'Validation failed',
                    // @ts-ignore
                    details: err.format(),
                },
            },
            400
        )
    }

    // Unexpected errors
    logger.error({ err, msg: 'Unhandled error' })

    return c.json(
        {
            success: false,
            error: {
                code: 'InternalServerError',
                message: config.isDev ? err.message : 'Something went wrong',
            },
        },
        500
    )
}
