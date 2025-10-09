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
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={login.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={login.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
}
