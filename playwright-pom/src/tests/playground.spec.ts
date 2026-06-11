import { expect, test } from '@playwright/test';
import PlaygroundPage from '../pages/PlaygroundPage';
import urlLinks from '../test-data/urlLink.json';

test.describe('PlaygroundPage', () => {
  
  test('Playground: validate the title', async ({ page }) => {
    const playgroundPage = new PlaygroundPage(page);

    await playgroundPage.open();
    await playgroundPage.validateHeading();
    await expect(page).toHaveTitle(/Selenium Grid Online/i);
  });

  test('Playground: Validate Page Title', async ({ page }) => {
    const playgroundPage = new PlaygroundPage(page);
    await playgroundPage.open();
    await expect(page).toHaveTitle('Selenium Grid Online | Run Selenium Test On Cloud');
  });
  
  for (const linkData of urlLinks) {
    test(`Playground: Validate canonical URL after navigating to "${linkData.text}"`, async ({ page }) => {
      const playgroundPage = new PlaygroundPage(page);
      await playgroundPage.open(); 
      await playgroundPage.clickLinkByName(linkData.text);
      await playgroundPage.validatePageURLs(linkData.path);
    });
  } 

}); 