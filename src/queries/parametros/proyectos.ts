import { createServerFn } from '@tanstack/react-start'

export type proyectsResponseType = {
    id: string
    name: string
    is_active: boolean
    gross_area: number
    net_area: number
    last_closure?: Date
}

export const getAllProyectos = createServerFn({ method: 'GET' })
    .inputValidator((data: { token: string }) => data)
    .handler(async ({ data }) => {
        const response = await fetch(
            `${process.env.BACKEND_SERVER_URL}/api/v1/parametros/proyectos`,
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
        console.log('responde', response)
        const resData = (await response.json()) as proyectsResponseType[]
        console.log('resData', resData)
        return resData
    })
