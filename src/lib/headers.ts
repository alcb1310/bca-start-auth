import { createServerFn } from '@tanstack/react-start'

export const headers = createServerFn({ method: 'GET' }).handler(
    // @ts-ignore: request is part of the data object
    ({ request }) => {
        return request.headers
    },
)
