import { test, expect } from '../base/baseTest';

test('Trivy report dashboard validation', async ({ report }) => {
  await report.validatePageTitle();
  await report.validateMenuList();
  await report.validateFilterButtons();
});

test('Trivy report sidebar functionality', async ({ report }) => {
  await report.collapseSidebar();
  const isCollapsed = await report.isSideMenuCollapsed();
  expect(isCollapsed).toBe(true);
});

test('Trivy report theme switch functionality', async ({ report }) => {
  await report.validateThemeSwitchIsVisible();
  await report.toggleTheme();
  await report.verifyThemeIs('dark');
  await report.toggleTheme();
  await report.verifyThemeIs('light');  
});


