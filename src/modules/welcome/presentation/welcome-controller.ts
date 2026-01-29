import type { Context } from 'hono'
import { GetWelcomeMessageUseCase } from '@/modules/welcome/application/use-cases/get-welcome-message'

// DI
const getWelcomeMessageUseCase = new GetWelcomeMessageUseCase()

export class WelcomeController {
    static getWelcome(c: Context) {
        const result = getWelcomeMessageUseCase.execute()
        return c.json(result)
    }
}
