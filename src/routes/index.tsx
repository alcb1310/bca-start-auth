// src/routes/index.tsx

import { Button } from '@/components/ui/button'
import { H2 } from '@/components/ui/typography'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <div>
            <H2>Home</H2>

            <Button>
                <Link to='/dashboard'>Dashboard</Link>
            </Button>
        </div>
    )
}
