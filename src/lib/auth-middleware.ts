import { createMiddleware } from "@tanstack/react-start";
import { auth } from "./auth";
import { getHeaders } from "better-auth/react";

export const authMiddleware = createMiddleware({ type: "function" }).server(
    async ({ next }) => {
        const session = await auth.api.getSession({
            headers: getHeaders() as unknown as Headers,
        });

        return await next({
            context: {
                user: {
                    id: session?.user.id,
                    name: session?.user?.name,
                    image: session?.user?.image,
                },
            },
        });
    },
);
