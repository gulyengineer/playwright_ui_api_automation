import { test, expect } from '@playwright/test';

test('Example page title contains Example', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

