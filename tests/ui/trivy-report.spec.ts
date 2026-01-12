import { test, expect } from '@playwright/test';

test.describe('Trivy HTML Report', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('C:\\Users\\dell\\VSCodeProjects\\playwright_ui_api_automation\\Trivy Report.html');
  });

  test(`Page title is Trivy Report`, async ({ page }) => {
    await expect(page).toHaveTitle('Trivy Report');
  });

  test(`Report heading is visible`, async ({ page }) => {
    const reportHeading = page.locator('h3', { hasText: 'Trivy Report - Vulnerabilities' });
    await expect(reportHeading).toBeVisible();
  });


});
