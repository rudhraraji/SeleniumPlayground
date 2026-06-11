import { expect, test } from '@playwright/test';
import PlaygroundPage from '../pages/PlaygroundPage';
import AjaxFormSubmitPage from '../pages/AjaxFormSubmitPage';
import urlLinks from '../test-data/urlLink.json';

test.describe('AjaxFormSubmitPage', () => {

  test('Ajax Form Submit:Page Heading', async ({ page }) => {
    const ajaxFormSubmitPage = new AjaxFormSubmitPage(page);
    const playgroundPage = new PlaygroundPage(page);
    await playgroundPage.open();
    await playgroundPage.AjaxFormSubmit.click();

    await ajaxFormSubmitPage.waitForPageToLoad();
    await ajaxFormSubmitPage.validatePageHeading();
   });

  test('Ajax Form Submit: Validate canonical URL after navigating', async ({ page }) => {
    const playgroundPage = new PlaygroundPage(page);
    await playgroundPage.open();
    await playgroundPage.AjaxFormSubmit.click();
    await page.waitForLoadState('domcontentloaded');
    await playgroundPage.validatePageURL('ajax-form-submit-demo');
  });

}); 