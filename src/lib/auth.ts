import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { account, session, user, verification } from "../db/auth-schema";

const db = drizzle(process.env.DATABASE_URL as string);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    schma: {
        user,
        session,
        account,
        verification,
    },
    emailAndPassword: {
        enabled: true,
    },
});
