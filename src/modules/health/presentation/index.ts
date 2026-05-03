import type { Context } from 'hono'
import { GetHealthStatusUseCase } from '@/modules/health/application/use-cases/get-health-status'
import { InMemoryHealthRepository } from '@/modules/health/infrastructure/persistence/in-memory-health-repository'
import type { IHealthRepository } from '@/modules/health/domain/repositories/health-repository'
import { OpenAPIHono } from '@hono/zod-openapi'
import { healthRoute } from './routes/health-routes'

const healthRouter = new OpenAPIHono();

// Dependency Injection (Manual)
const repository: IHealthRepository = new InMemoryHealthRepository()
const getHealthStatusUseCase = new GetHealthStatusUseCase(repository)

healthRouter.openapi(healthRoute, async (c) => {
    const result = await getHealthStatusUseCase.execute()

    return c.json({
        timestamp: new Date().toISOString(),
        version: result.version,
        status: result.status
    }, 200)
})

export default healthRouter