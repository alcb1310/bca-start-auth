import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function H1({ className, ...props }: ComponentProps<"h1">) {
    return (
        <h1
            data-slot="h1"
            className={cn(
                "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
                className,
            )}
            {...props}
        />
    );
}

export function H2({ className, ...props }: ComponentProps<"h2">) {
    return (
        <h2
            data-slot="h2"
            className={cn(
                "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
            {...props}
        />
    );
}

export function H3({ className, ...props }: ComponentProps<"h3">) {
    return (
        <h3
            data-slot="h3"
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    );
}

export function H4({ className, ...props }: ComponentProps<"h4">) {
    return (
        <h4
            data-slot="h4"
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    );
}

export function Parragraph({ className, ...props }: ComponentProps<"p">) {
    return (
        <p
            data-slot="p"
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    );
}

export function BlockQuote({
    className,
    ...props
}: ComponentProps<"blockquote">) {
    return (
        <blockquote
            data-slot="blockquote"
            className={cn("mt-6 border-l-2 pl-6 italic", className)}
            {...props}
        />
    );
}
