import { createMiddleware } from '@tanstack/react-start'
import { HEADERS, getRequest } from '@tanstack/react-start/server'
import { auth } from './auth'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
    async (info) => {
        const req = getRequest()
        const session = await auth.api.getSession({
            headers: req.headers,
        })

        return await info.next({
            context: {
                user: {
                    id: session?.user.id,
                    name: session?.user?.name,
                    image: session?.user?.image,
                },
            },
        })
    },
)
