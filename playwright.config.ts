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
    baseURL: getEnvOrThrow('TEST_REPORT_URL'),
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

