import type { HealthEntity } from '@/modules/health/domain/entities/health-entity'
import type { IHealthRepository } from '@/modules/health/domain/repositories/health-repository'

export class InMemoryHealthRepository implements IHealthRepository {
    async getHealthStatus(): Promise<HealthEntity> {
        const version = process.env.npm_package_version || '1.0.0'
        const timestamp = new Date().toISOString()

        return {
            status: 'ok',
            version,
            timestamp,
        }
    }
}
