import { expect } from '@playwright/test';
import { extractCountFromButton } from '../utils/regexUtils.js';
import { waitForButtonCountToLoad } from '../utils/waitUtils.js';

export class TrivyReportPage {
  constructor(page) {
    this.page = page;
    this.table = page.locator('table');
  }

  severityButton(severity) {
    return this.page.getByRole('button', {
      name: new RegExp(`^${severity}`, 'i')
    });
  }

  async getSeverityCount(severity) {
    const button = this.severityButton(severity);
    await waitForButtonCountToLoad(button, severity);
    const text = await button.innerText();
    return extractCountFromButton(text);
  }

  async clickSeverity(severity) {
    await this.severityButton(severity).click();
  }

  async getVisibleRowCount() {
    return await this.table.locator('tbody tr:visible').count();
  }

  async getSeverityColumnIndex() {
    const headers = await this.table.locator('thead th').allInnerTexts();
    return headers.findIndex(h => h.trim().includes('Severity'));
  }

  async expectAllRowsToHaveSeverity(expectedSeverity) {
    const severityIndex = await this.getSeverityColumnIndex();
    const rows = await this.table.locator('tbody tr:visible').all();

    for (const row of rows) {
      const cell = row.locator('td').nth(severityIndex);
      await expect(cell).toHaveText(expectedSeverity);
    }
  }
}
