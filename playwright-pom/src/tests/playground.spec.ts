import { expect, test } from '../fixtures/test';
import PlaygroundPage from '../pages/PlaygroundPage';
import links from '../data/playgroundLinks.json';

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

test.describe('Playground', () => {
  let playgroundPage: PlaygroundPage;

  test.beforeEach(async ({ page }) => {
    playgroundPage = new PlaygroundPage(page);
    await playgroundPage.open();
    await playgroundPage.validateHeading();
  });

  for (const link of links) {
    test(`Navigate to ${link.text} and validate URL`, async ({ page }) => {
      const linkLocator = page.getByRole('link', {name: link.text, exact: true, });
      await linkLocator.click();
      await expect(page).toHaveURL(new RegExp(link.path + '$'));
    });
  }
});

}); 