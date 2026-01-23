import { Locator, expect } from '@playwright/test';

/**
 * Waits for the severity button text to load and stabilize.
 * Handles cases where the count is 0 or updates asynchronously.
 */
export async function waitForButtonCountToLoad(
  button: Locator,
  severity: string,
  timeout = 15_000
): Promise<void> {

  // Wait until the text contains at least one number (handles 0 too)
  await expect(button, `Waiting for ${severity} count to load`)
    .toHaveText(/\d+/, { timeout });

  // Optional extra check: wait until the text stops changing for a short period
  // This ensures we read the **final value**, not a temporary placeholder
  await expect.poll(async () => {
    const text1 = await button.innerText();
    await button.page().waitForTimeout(100); // short delay
    const text2 = await button.innerText();
    return text1 === text2 ? text1 : null;
  }, {
    message: `Waiting for ${severity} count to stabilize`,
    timeout,
  }).not.toBeNull();
}