import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        tailwindcss(),
        tsConfigPaths(),
        tanstackStart(),
        netlify(),
        nitroV2Plugin({
            preset: 'node-server'
        }),
        // react's vite plugin must come after start's vite plugin
        viteReact(),
    ],
});
