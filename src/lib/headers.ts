import { createServerFn } from '@tanstack/react-start'
import { auth } from './auth'

export const headers = createServerFn({ method: 'GET' }).handler(
    // @ts-ignore: request is part of the data object
    async ({ request }) => {
        const data = await auth.api.getToken({ headers: request.headers })
        return data.token
    },
)
