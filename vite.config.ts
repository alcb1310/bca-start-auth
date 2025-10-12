import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { nitro } from 'nitro-nightly/vite'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        tailwindcss(),
        tsConfigPaths(),
        tanstackStart(),
        netlify(),
        nitro(),
        // react's vite plugin must come after start's vite plugin
        viteReact(),
    ],
});
