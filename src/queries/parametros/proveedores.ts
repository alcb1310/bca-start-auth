import { createServerFn } from '@tanstack/react-start'
import * as z from 'zod'

const server = process.env.VITE_BACKEND_SERVER_URL

export type suppliersResponseType = {
    id: string
    supplier_id: string
    name: string
    contact_name?: string
    contact_email?: string
    contact_phone?: string
}

export const suppliersCreateSchema = z.object({
    supplier_id: z.string(),
    name: z.string(),
    contact_name: z.string().optional(),
    contact_email: z.string().optional(),
    contact_phone: z.string().optional(),
})

export type suppliersCreateType = z.infer<typeof suppliersCreateSchema>

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
        return resData
    })
