import { test as base, expect, Page } from '@playwright/test';
import { TrivyReportPage } from '../pages/TrivyReportPage';
import { getEnvOrThrow } from '../utils/env';

type Fixtures = {
  report: TrivyReportPage;
};

export const test = base.extend<Fixtures>({
  report: async ({ page, context }, use, testInfo) => {
    // Start tracing (equivalent to @BeforeEach)
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
    });

    // Navigate to report
    await page.goto(getEnvOrThrow('TEST_REPORT_URL'));

    // Create page object
    const report = new TrivyReportPage(page);

    await use(report);

    // Stop tracing (equivalent to @AfterEach)
    await context.tracing.stop({
      path: testInfo.outputPath('trace.zip'),
    });
  },
});

export { expect };