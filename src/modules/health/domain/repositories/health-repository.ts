import type { HealthEntity } from '../entities/health-entity'

export interface IHealthRepository {
    getHealthStatus(): Promise<HealthEntity>
}
