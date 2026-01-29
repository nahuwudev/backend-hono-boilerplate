import type { HealthEntity } from '@/modules/health/domain/entities/health-entity'
import type { IHealthRepository } from '@/modules/health/domain/repositories/health-repository'

export class GetHealthStatusUseCase {
    constructor(private readonly healthRepository: IHealthRepository) { }

    async execute(): Promise<HealthEntity> {
        return this.healthRepository.getHealthStatus()
    }
}
