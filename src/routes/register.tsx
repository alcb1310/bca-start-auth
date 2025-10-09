import { signUp } from "@/lib/auth-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type ChangeEvent, type FormEvent, useState } from "react";

export const Route = createFileRoute("/register")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [enabled, setEnabled] = useState<boolean>(false);

    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { data, error } = await signUp.email(
            {
                email,
                password,
                name,
            },
            {
                onRequest: () => {
                    setEnabled(true);
                },
                onSuccess: () => {
                    setEnabled(false);
                    navigate({ to: "/" });
                },
                onError: (error) => {
                    setEnabled(false);
                    console.error(error);
                    alert(error.error.message);
                },
            },
        );

        console.log({ data, error });
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleReset() {
        setEmail("");
        setPassword("");
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={enabled}>
                        Register
                    </button>
                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
