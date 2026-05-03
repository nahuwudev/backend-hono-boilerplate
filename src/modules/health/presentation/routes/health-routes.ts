import { createRoute, z } from "@hono/zod-openapi";
import { HealthErrorSchema, HealthResponseSchema } from "../schemas/health-schema";

export const healthRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Health'],
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: HealthResponseSchema
                }
            },
            description: 'Health check exitoso.'
        },
        500: {
            content: {
                'application/json': {
                    schema: HealthErrorSchema
                }
            },
            description: 'Error interno.'
        }
    }
})