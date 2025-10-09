import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H2 } from "@/components/ui/typography";
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
            <H2>Register</H2>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="default" type="submit" disabled={enabled}>
                        Register
                    </Button>
                    <Button variant="secondary" type="reset" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
}
