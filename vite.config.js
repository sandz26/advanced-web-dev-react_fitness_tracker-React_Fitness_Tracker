import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: [
        'src/components/**/*.{js,jsx}',
        'src/pages/**/*.{js,jsx}',
        'src/hooks/**/*.{js,jsx}',
        'src/utils/**/*.{js,jsx}',
      ],
      exclude: ['src/**/*.test.js', 'src/test-utils.jsx'],
    },
  },
})
