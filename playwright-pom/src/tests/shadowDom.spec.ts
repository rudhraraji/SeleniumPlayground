import { expect, test } from '@playwright/test';
import ShadowDomPage from '../pages/ShadowDomPage';

test.describe('Shadow DOM Demo', () => {
  test('renders the shadow host and its editable controls', async ({ page }) => {
    const shadowPage = new ShadowDomPage(page);
    await shadowPage.open();

    await expect(shadowPage.nameInput).toBeVisible();
    await expect(shadowPage.emailInput).toBeVisible();
    await expect(shadowPage.slider).toBeVisible();

    await shadowPage.nameInput.fill('Playwright User');
    await shadowPage.emailInput.fill('playwright@example.com');
    await expect(shadowPage.nameInput).toHaveValue('Playwright User');
    await expect(shadowPage.emailInput).toHaveValue('playwright@example.com');
  });
});
