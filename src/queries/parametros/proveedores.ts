import { emailInputSchema } from '@/utils/optionalEmail'
import { createServerFn } from '@tanstack/react-start'
import * as z from 'zod'

const server = process.env.VITE_BACKEND_SERVER_URL

export const suppliersResponseSchema = z.object({
    id: z.string(),
    supplier_id: z.string().trim().min(1, { message: 'RUC es requerido' }),
    name: z.string().trim().min(1, { message: 'Nombre es requerido' }),
    contact_name: z.string().optional(),
    contact_email: emailInputSchema,
    contact_phone: z.string().optional(),
})

export const suppliersCreateSchema = z.object({
    supplier_id: z.string().trim().min(1, { message: 'RUC es requerido' }),
    name: z.string().trim().min(1, { message: 'Nombre es requerido' }),
    contact_name: z.string().optional(),
    contact_email: emailInputSchema,
    contact_phone: z.string().optional(),
})

export type suppliersCreateType = z.infer<typeof suppliersCreateSchema>
export type suppliersResponseType = z.infer<typeof suppliersResponseSchema>

export const getAllProveeodres = createServerFn({ method: 'GET' })
    .inputValidator((data: { token: string }) => data)
    .handler(async ({ data }) => {
        const response = await fetch(
            `${server}/api/v1/parametros/proveedores`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
            },
        )

        if (!response.ok) {
            const resData = await response.json()
            console.error('Network response was not ok', resData)
            throw new Error(resData.error)
        }
        const resData = (await response.json()) as suppliersResponseType[]
        return resData ? resData : []
    })

export const createProveedor = createServerFn({ method: 'POST' })
    .inputValidator(
        (data: { token: string; data: suppliersCreateType }) => data,
    )
    .handler(async ({ data: { token, data } }) => {
        const response = await fetch(
            `${server}/api/v1/parametros/proveedores`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            },
        )
        console.log(response)
        if (!response.ok) {
            const resData = await response.json()
            console.error('Network response was not ok', resData)
            throw new Error(resData.error)
        }
        return
    })
