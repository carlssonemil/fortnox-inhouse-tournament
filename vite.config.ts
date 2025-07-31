import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/fortnox-inhouse-tournament/',
    plugins: [
        tailwindcss(),
    ],
})