// src/routes/__root.tsx
/// <reference types="vite/client" />

import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import appCss from '../styles.css?url'
import { ThemeProvider } from '@/components/theme/provider'
import { ModeToggle } from '@/components/theme/mode-toggle'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <ThemeProvider defaultTheme='dark' storageKey='bca-theme'>
                <nav className='flex items-right justify-end p-4'>
                    <ModeToggle />
                </nav>
                <Outlet />
            </ThemeProvider>
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='en'>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}
