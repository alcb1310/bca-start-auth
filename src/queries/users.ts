import { authClient } from '@/lib/auth-client'

export async function listUsers() {
    const { data } = await authClient.admin.listUsers({ query: {} })
    return data ? data.users : []
}
