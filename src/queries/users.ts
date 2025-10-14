import { authClient } from '@/lib/auth-client'

export async function listUsers() {
    const { data } = await authClient.admin.listUsers({ query: {} })
    console.log('listUsers', data)
    return data ? data.users : []
}
