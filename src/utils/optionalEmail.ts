import z from 'zod'

const optionalTextInput = (schema: z.ZodString) =>
    z
        .union([z.string(), z.undefined()])
        .refine((val) => !val || schema.safeParse(val).success)

export const emailInputSchema = optionalTextInput(z.string().email())
