import { Page, Locator, expect } from '@playwright/test';

export class TrivyReportPage {
  readonly page: Page;

  readonly sideMenu: Locator;
  readonly collapseButton: Locator;
  readonly tableHeaders: Locator;
  readonly vulsTable: Locator;
  readonly themeSwitch: Locator;
  readonly htmlTag: Locator;

  readonly filters: string[];
  readonly expectedTableHeaderList: string[];
  readonly expectedMenus: string[];

  constructor(page: Page) {
    this.page = page;

    this.sideMenu = page.locator('.ant-menu');
    this.collapseButton = page.getByRole('button', { name: 'menu-fold' });

    this.tableHeaders = page.locator('.ant-table-thead th');
    this.vulsTable = page.locator('.ant-table');

    this.expectedTableHeaderList = [
      'Target',
      'Library/Package',
      'Vulnerability',
      'NVD V2Score',
      'NVD V3Score',
      'EPSS Score %',
      'Severity',
      'Exploits',
      'Installed Version',
      'Fixed Version',
      'Title',
    ];

    this.expectedMenus = [
      'Vulnerabilities',
      'Misconfigurations',
      'Secrets',
      'Licenses',
      'Misconfiguration Summary',
      'K8s Cluster Summary',
      'Supply Chain SBOM(spdx)',
      'Load a report',
    ];

    this.filters = [
      'Critical',
      'High',
      'Medium',
      'Low',
      'Negligible',
      'All',
      'Has Exploit',
      'Has fix',
      'Has no fix',
    ];

    this.themeSwitch = page.locator('button.ant-switch');
    this.htmlTag = page.locator('html');
  }

  // Page validations
  async validatePageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Trivy Report');
  }

  async validateMenuList(): Promise<void> {
    for (const menuText of this.expectedMenus) {
      await expect(
        this.page.locator('.ant-menu-item', { hasText: menuText }),
      ).toBeVisible();
    }
  }

  async isVulsTableVisible(): Promise<void> {
    await expect(this.vulsTable).toBeVisible();
  }

  // Sidebar
  async collapseSidebar(): Promise<void> {
    if (!(await this.isSideMenuCollapsed())) {
      await this.collapseButton.click();
    }
  }

  async isSideMenuCollapsed(): Promise<boolean> {
    const classAttr = await this.sideMenu.getAttribute('class');
    return classAttr?.includes('ant-menu-inline-collapsed') ?? false;
  }

  // Table
  async validateHeadersMatch(): Promise<void> {
    await expect(this.tableHeaders).toHaveText(this.expectedTableHeaderList);
  }

  // Filters
  async validateFilterButtons(): Promise<void> {
    for (const filter of this.filters) {
      const filterBtn = this.page.getByRole('button', { name: filter });
      await expect(filterBtn).toBeVisible();
    }
  }

  // Theme Switch
  async validateThemeSwitchIsVisible(): Promise<void> {
    await expect(this.themeSwitch).toBeVisible();
  }

  async toggleTheme(): Promise<void> {
    await this.themeSwitch.click();
  }

  async verifyThemeIs(expectedTheme: string): Promise<void> {
    await expect(this.htmlTag).toHaveAttribute('data-theme', expectedTheme);
  }
}