import { test, expect } from '@playwright/test';
import { getEnvOrThrow } from '../../utils/env';

test.describe('Trivy HTML Report', () => {

  test.beforeEach(async ({ page }) => {

      await page.goto(getEnvOrThrow('TEST_REPORT_URL'));
   
  });

  test(`Page title is Trivy Report`, async ({ page }) => {
    await expect(page).toHaveTitle('Trivy Report');
  });

  test(`Report heading is visible`, async ({ page }) => {
    const reportHeading = page.locator('h3', { hasText: 'Trivy Report - Vulnerabilities' });
    await expect(reportHeading).toBeVisible();
  });



});

