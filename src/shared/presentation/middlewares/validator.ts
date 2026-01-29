import { zValidator as honoZValidator } from '@hono/zod-validator'
import type { ValidationTargets } from 'hono'
import { ZodType, z } from 'zod'

export const zValidator = <T extends ZodType>(
    target: keyof ValidationTargets,
    schema: T
) =>
    honoZValidator(target, schema, (result, c) => {
        if (!result.success) {
            return c.json(
                {
                    success: false,
                    error: {
                        code: 'ValidationError',
                        message: 'Validation failed',
                        details: z.treeifyError(result.error)
                    },
                },
                400
            )
        }
    })
