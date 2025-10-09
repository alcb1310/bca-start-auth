import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "../lib/auth-server";

export const Route = createFileRoute("/_authed")({
    component: RouteComponent,
    beforeLoad: async () => {
        const user = await getUser();

        if (!user) {
            throw redirect({ to: "/login" });
        }

        return { user };
    },
});

function RouteComponent() {
    return <Outlet />;
}
