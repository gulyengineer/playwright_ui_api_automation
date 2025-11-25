import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // default baseURL (can be overridden per-project or via env vars)
    baseURL: process.env.BASE_URL || 'https://example.com',
    actionTimeout: 0,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'ui',
      testMatch: ['tests/ui/**/*.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL || 'https://example.com'
      }
    },
    {
      name: 'api',
      testMatch: ['tests/api/**/*.spec.ts'],
      use: {
        // API tests use the request fixture which will resolve paths against this baseURL
        baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com'
      }
    }
  ]
});
