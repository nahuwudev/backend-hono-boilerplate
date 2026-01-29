import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
})

const envVars = envSchema.safeParse(process.env)

if (!envVars.success) {
    console.error('❌ Invalid environment variables:', envVars.error.format())
    process.exit(1)
}

export const config = {
    env: envVars.data.NODE_ENV,
    isDev: envVars.data.NODE_ENV === 'development',
    isProd: envVars.data.NODE_ENV === 'production',
    port: envVars.data.PORT,
    logLevel: envVars.data.LOG_LEVEL,
} as const
