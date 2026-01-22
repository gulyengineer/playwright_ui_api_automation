import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { getEnvOrThrow } from './tests/utils/env.ts';

dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: 'tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // default baseURL (can be overridden per-project)
    baseURL: getEnvOrThrow('BASE_URL'),
    actionTimeout: 0,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'ui',
      testMatch: ['tests/specs/**/*.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvOrThrow('TEST_REPORT_URL'),
        headless: false,
        trace: 'on-first-retry',
      }
    },
    {
      name: 'api',
      testMatch: ['tests/example/**/*.spec.ts'],
      use: {
        baseURL: getEnvOrThrow('API_BASE_URL')
      }
    }
  ]
});

