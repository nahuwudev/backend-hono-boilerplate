import { config } from '@/config/config'
import type { WelcomeEntity } from '@/modules/welcome/domain/entities/welcome-entity'

export class GetWelcomeMessageUseCase {
    execute(): WelcomeEntity {
        return {
            message: 'Welcome to the API',
            version: config.env,
        }
    }
}
