// src/routes/index.tsx

import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    return (
        <div>
            <h1>Home</h1>

            <Button>
                <Link to="/dashboard">Dashboard</Link>
            </Button>
        </div>
    );
}
