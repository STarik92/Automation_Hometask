import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work', () => {
  test('navigate to client work and verify text', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Try to open Services from header. If click is intercepted, navigate directly to /services
    try {
      await page.waitForSelector('text=Services', { timeout: 10000 });
      await page.click('text=Services');
    } catch (e) {
      await page.goto('https://www.epam.com/services', { waitUntil: 'domcontentloaded' });
    }

    // Click the "Explore Our Client Work" link (case variations handled)
    try {
      await page.waitForSelector('text=Explore Our Client Work', { timeout: 10000 });
      await page.click('text=Explore Our Client Work');
    } catch (e) {
      await page.waitForSelector('text=Explore our client work', { timeout: 5000 });
      await page.click('text=Explore our client work');
    }

    await page.waitForLoadState('domcontentloaded');

    // Verify that "Client Work" text is visible on the page
    await expect(page.locator('text=Client Work')).toBeVisible();

    // Ensure browser is closed at the end of the test
    await page.close();
  });
});
