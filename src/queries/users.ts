import type { UserWithRole } from 'better-auth/plugins'
//
export async function listUsers({ token }: { token: string }) {
    const response = await fetch('/api/auth/admin/list-users', {
        // const response = await fetch('http://localhost:8080/api/v1/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        console.error('Network response was not ok')
        throw new Error('Network response was not ok')
    }
    const { users } = await response.json()
    return users as UserWithRole[]
}
