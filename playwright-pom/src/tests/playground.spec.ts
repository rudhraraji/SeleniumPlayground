import { expect, test } from '@playwright/test';
import PlaygroundPage from '../pages/PlaygroundPage';

test.describe('PlaygroundPage', () => {
  test('should open the playground and validate the title', async ({ page }) => {
    const playgroundPage = new PlaygroundPage(page);

    await playgroundPage.open();

    await expect(page).toHaveTitle(/Selenium Grid Online/i);
  });

  test('should close the playground page without errors', async ({ page }) => {
    const playgroundPage = new PlaygroundPage(page);

    await playgroundPage.open();

    await playgroundPage.close();
  });
});