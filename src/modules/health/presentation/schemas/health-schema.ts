import { z } from "zod";

export const HealthResponseSchema = z.object({
    version: z.string(),
    status: z.enum(["ok", "degraded", "down"]),
    timestamp: z.iso.datetime().optional(),
});

export const HealthErrorSchema = z.object({
    error: z.string(),
});