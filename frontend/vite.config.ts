
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    base: '/',
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "~/": "/src",
            "node_modules/": "/node_modules",
        }
    },
    css:{
        preprocessorOptions:{
            scss: {
                api : "modern-compiler",
                silenceDeprecations:[
                    'mixed-decls',
                    'color-functions',
                    'global-builtin',
                    'import'
                ],
            }
        }
    }
})