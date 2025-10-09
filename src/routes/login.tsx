import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { type ChangeEvent, type FormEvent, useState } from "react";

export const Route = createFileRoute("/login")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const [login, setLogin] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setLogin({
            ...login,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { data, error } = await signIn.email(
            {
                email: login.email,
                password: login.password,
            },
            {
                onSuccess: () => {
                    console.log("Logged in");
                    navigate({ to: "/dashboard" });
                },
                onError: (error) => {
                    console.error(error);
                    alert(error.error.message);
                },
            },
        );

        console.log({ data, error });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={login.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={login.password}
                        onChange={handleChange}
                    />
                </div>
                <Button variant="default" type="submit">
                    Login
                </Button>
            </form>
            <Button variant="link" size="sm">
                <Link to="/register">Register</Link>
            </Button>
        </div>
    );
}
