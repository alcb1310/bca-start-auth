import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { getUser } from "../lib/auth-server";
import { signOut } from "../lib/auth-client";

export const Route = createFileRoute("/dashboard")({
    component: RouteComponent,
    beforeLoad: async () => {
        const user = await getUser();
        return { user };
    },
    loader: async ({ context }) => {
        if (!context.user.id) {
            throw redirect({ to: "/login" });
        }

        return {
            user: context.user,
        };
    },
});

function RouteComponent() {
    const { user } = Route.useLoaderData();
    const navigate = useNavigate();

    function handleLogout() {
        signOut(
            {},
            {
                onSuccess: () => {
                    navigate({ to: "/login" });
                },
            },
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p> User: {user.name}</p>

            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
