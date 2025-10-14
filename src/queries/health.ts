import { createServerFn } from '@tanstack/react-start'

type responseType = {
    message: string
}

export const getHealth = createServerFn({ method: 'GET' })
    .inputValidator((data: { token: string }) => data)
    .handler(async ({ data }) => {
        const response = await fetch(
            `${process.env.BACKEND_SERVER_URL}/api/v1/health`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
            },
        )
        console.log('getHealth response', response)
        if (!response.ok) {
            console.error('Network response was not ok')
            throw new Error('Network response was not ok')
        }
        const resData = (await response.json()) as responseType
        console.log('getHealth response data', resData)
        return resData
    })
