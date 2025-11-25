import { test, expect } from '@playwright/test';

test('Example page title contains Example', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Example/);
});

