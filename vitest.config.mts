import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      // at least one instance is required
      instances: [{ browser: 'chromium' }],
    },
    environment: 'jsdom',
  },
  define: {
    'process.env': {},
  },
});
