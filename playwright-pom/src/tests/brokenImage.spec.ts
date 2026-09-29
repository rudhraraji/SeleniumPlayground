import { expect, test } from '@playwright/test';
import BrokenImagePage from '../pages/BrokenImagePage';

test('Broken Image Demo › displays both intentionally broken images', async ({ page }) => {
  const brokenImagePage = new BrokenImagePage(page);
  await brokenImagePage.open();

  await expect(brokenImagePage.brokenImages).toHaveCount(2);
  const imagesAreBroken = await brokenImagePage.brokenImages.evaluateAll(images =>
    images.every(image => (image as HTMLImageElement).naturalWidth === 0),
  );
  expect(imagesAreBroken).toBe(true);
});
