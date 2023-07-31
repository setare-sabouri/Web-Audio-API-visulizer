// const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env
import dotenv from 'dotenv';
dotenv.config();


export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },

    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}