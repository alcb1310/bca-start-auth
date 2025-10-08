# BCA with Better Auth

## Stack

- [Tanstack Start](https://tanstack.com/start)
- [Better Auth](https://better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)

## Installation

Add the following to your `.env` file:

```env
DATABASE_URL=postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}?schema=public
BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
BETTER_AUTH_URL=${BETTER_AUTH_URL} # not sure yet if this is needed
```

```bash
pnpm install
npx drizzle-kit migrate
```

## Tools

- [Neovim](https://neovim.io/)
- [Tmux](https://github.com/tmux/tmux/wiki)
- [Postgres](https://www.postgresql.org/)

## Developed by

- [Andres Court](https://linkedin.com/in/alcb1310)
