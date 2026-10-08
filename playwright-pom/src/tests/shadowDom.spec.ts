import { expect, test } from '../fixtures/test';
import ShadowDomPage from '../pages/ShadowDomPage';

test.describe('Shadow DOM Demo', () => {
  test('renders the shadow host and its controls', async ({ page }) => {
    const shadowPage = new ShadowDomPage(page);
    await shadowPage.open();

    await expect(shadowPage.nameInput).toBeVisible();
    await expect(shadowPage.emailInput).toBeVisible();
    await expect(shadowPage.slider).toBeVisible();
    await expect(shadowPage.slider).toHaveValue('50');
  });

  test('fills contact fields inside the shadow root', async ({ page }) => {
    const shadowPage = new ShadowDomPage(page);
    await shadowPage.open();

    await shadowPage.fillContactDetails('Playwright User', 'playwright@example.com');
    await expect(shadowPage.nameInput).toHaveValue('Playwright User');
    await expect(shadowPage.emailInput).toHaveValue('playwright@example.com');
  });

  test('changes the shadow-root slider value', async ({ page }) => {
    const shadowPage = new ShadowDomPage(page);
    await shadowPage.open();

    await shadowPage.setSliderValue('75');
    await expect(shadowPage.slider).toHaveValue('75');
  });
});
