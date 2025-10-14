import * as schema from '@/db/auth-schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/node-postgres'
import { admin, jwt } from 'better-auth/plugins'

const db = drizzle(process.env.DATABASE_URL as string)

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    plugins: [
        admin({
            defaultRole: 'admin',
        }),
        jwt(),
    ],
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    trustedOrigins: [
        'http://localhost:3000',
        'https://bca-start-auth-production.up.railway.app',
    ],
})
