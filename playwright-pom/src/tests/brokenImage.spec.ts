import { expect, test } from '@playwright/test';
import BrokenImagePage from '../pages/BrokenImagePage';

test('Broken Image Demo › displays both image examples', async ({ page }) => {
  const brokenImagePage = new BrokenImagePage(page);
  await brokenImagePage.open();

  await expect(brokenImagePage.imageWithAltHeading).toBeVisible();
  await expect(brokenImagePage.imageWithoutAltHeading).toBeVisible();
  await expect(brokenImagePage.brokenImages).toHaveCount(2);
});

test('Broken Image Demo › confirms each image fails to load', async ({ page }) => {
  const brokenImagePage = new BrokenImagePage(page);
  await brokenImagePage.open();

  await expect(brokenImagePage.brokenImages).toHaveCount(2);
  for (const image of await brokenImagePage.brokenImages.all()) {
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBe(0);
  }
});
