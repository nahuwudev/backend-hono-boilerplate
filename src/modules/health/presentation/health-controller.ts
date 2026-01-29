import type { Context } from 'hono'
import { GetHealthStatusUseCase } from '@/modules/health/application/use-cases/get-health-status'
import { InMemoryHealthRepository } from '@/modules/health/infrastructure/persistence/in-memory-health-repository'
import type { IHealthRepository } from '@/modules/health/domain/repositories/health-repository'

// Dependency Injection (Manual)
const repository: IHealthRepository = new InMemoryHealthRepository()
const getHealthStatusUseCase = new GetHealthStatusUseCase(repository)

export class HealthController {
    static async getHealth(c: Context) {
        const status = await getHealthStatusUseCase.execute()
        return c.json(status)
    }
}
