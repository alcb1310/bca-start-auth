import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const server = process.env.VITE_BACKEND_SERVER_URL

export type proyectsResponseType = {
    id: string
    name: string
    is_active: boolean
    gross_area: number
    net_area: number
    last_closure?: Date
}

export const proyectCreateSchema = z.object({
    name: z.string().trim().min(1, { message: 'Nombre es requerido' }),
    is_active: z.boolean(),
    gross_area: z.coerce.number({ message: 'Ingrese un número válido' }),
    net_area: z.coerce.number({ message: 'Ingrese un número válido' }),
})

export type proyectCreateType = z.infer<typeof proyectCreateSchema>

export const getAllProyectos = createServerFn({ method: 'GET' })
    .inputValidator((data: { token: string }) => data)
    .handler(async ({ data }) => {
        const response = await fetch(`${server}/api/v1/parametros/proyectos`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
        })

        if (!response.ok) {
            const resData = await response.json()
            console.error('Network response was not ok', resData)
            throw new Error(`Network response was not ok ${resData.Message}`)
        }
        const resData = (await response.json()) as proyectsResponseType[]
        return resData ? resData : []
    })

export const createProyect = createServerFn({ method: 'POST' })
    .inputValidator((data: { token: string; data: proyectCreateType }) => data)
    .handler(async ({ data: { token, data } }) => {
        const response = await fetch(`${server}/api/v1/parametros/proyectos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const resData = await response.json()
            console.error('Network response was not ok', resData)
            throw new Error(resData.error)
        }
        return
    })

export const updateProyect = createServerFn({ method: 'POST' })
    .inputValidator(
        (data: { token: string; data: proyectsResponseType }) => data,
    )
    .handler(async ({ data: { token, data } }) => {
        const response = await fetch(
            `${server}/api/v1/parametros/proyectos/${data.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            },
        )
        if (!response.ok) {
            const resData = await response.json()
            console.error('Network response was not ok', resData)
            throw new Error(resData.error)
        }
        return
    })
