import { H1 } from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            <H1>Login</H1>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={login.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="password">Password</Label>
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
