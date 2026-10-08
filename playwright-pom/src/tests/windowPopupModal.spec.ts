import { expect, test } from '../fixtures/test';
import WindowPopupModalPage from '../pages/WindowPopupModalPage';
import { appUrl } from '../config/environment';

test.describe('Window Popup Modal Demo', () => {
  let popupPage: WindowPopupModalPage;

  test.beforeEach(async ({ page }) => {
    popupPage = new WindowPopupModalPage(page);
    await popupPage.open();
  });

  test('opens the configured URL in a popup', async ({ page }) => {
    const destinationUrl = appUrl('');
    await popupPage.configureCustomUrl(destinationUrl);

    const popupPromise = page.waitForEvent('popup');
    await popupPage.openUrlLink.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(destinationUrl);
  });
});
