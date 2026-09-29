import { expect, test } from '@playwright/test';
import WindowPopupModalPage from '../pages/WindowPopupModalPage';
import { appUrl } from '../config/environment';

test('Window Popup Modal Demo › opens a configured URL in a popup', async ({ page }) => {
  const popupPage = new WindowPopupModalPage(page);
  await popupPage.open();

  await expect(popupPage.singleWindowLinks).toHaveCount(3);
  await expect(popupPage.multipleWindowLinks).toHaveCount(2);
  await popupPage.customUrlInput.pressSequentially(appUrl(''));
  await expect(popupPage.openUrlLink).not.toHaveClass(/pointer-events-none/);

  const popupPromise = page.waitForEvent('popup');
  await popupPage.openUrlLink.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(appUrl(''));
});
