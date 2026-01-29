export class HealthEntity {
    constructor(
        public readonly status: 'ok' | 'degraded' | 'down',
        public readonly version: string,
        public readonly timestamp: string
    ) { }
}
