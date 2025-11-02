import { createServerFn } from '@tanstack/react-start'
import { auth } from './auth'
import { decodeJwt } from 'jose'
import { authClient } from './auth-client'

export const headers = createServerFn({ method: 'GET' }).handler(
    // @ts-ignore: request is part of the data object
    async ({ request }) => {
        const data = await auth.api.getToken({ headers: request.headers })

        if (isTokenValid(data.token)) {
            console.info('Token is valid')
            return data.token
        }

        console.info('Refreshing token')
        const token =
            (await authClient.token().then((x) => x.data?.token)) || null

        return token
    },
)

function isTokenValid(token: string): boolean {
    if (!token) {
        return false
    }

    const jwt = decodeJwt(token)
    if (!jwt.exp) {
        return false
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000)
    return jwt.exp > currentTimeInSeconds
}
