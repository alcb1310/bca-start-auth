import { signOut } from "@/lib/auth-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = Route.useRouteContext();
    const navigate = useNavigate();

    function handleLogout() {
        signOut(
            {},
            {
                onSuccess: () => {
                    navigate({ to: "/" });
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
