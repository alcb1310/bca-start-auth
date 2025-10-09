import { createMiddleware } from "@tanstack/react-start";
import { HEADERS } from "@tanstack/react-start/server";
import { auth } from "./auth";

export const authMiddleware = createMiddleware({ type: "function" }).server(
    async ({ next }) => {
        const session = await auth.api.getSession({
            headers: HEADERS,
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
