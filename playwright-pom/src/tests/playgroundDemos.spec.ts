import { test } from '../fixtures/test';
import PlaygroundDemoPage from '../pages/PlaygroundDemoPage';
import links from '../data/playgroundLinks.json';

test.describe('Playground demo pages', () => {
  for (const link of links) {
    test(`${link.text} page loads`, async ({ page }) => {
      const demoPage = new PlaygroundDemoPage(page, link.path);
      await demoPage.open();
      await demoPage.validatePageLoaded();
    });
  }
});
