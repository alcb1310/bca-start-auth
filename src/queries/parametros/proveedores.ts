import { createServerFn } from '@tanstack/react-start'

const server = process.env.VITE_BACKEND_SERVER_URL

export type suppliersResponseType = {
    id: string
    supplier_id: string
    name: string
    contact_name?: string
    contact_email?: string
    contact_phone?: string
}

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
            throw new Error(`Network response was not ok ${resData.Message}`)
        }
        const resData = (await response.json()) as suppliersResponseType[]
        return resData
    })
