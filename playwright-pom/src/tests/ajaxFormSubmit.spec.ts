import { expect, test } from '../fixtures/test';
import PlaygroundPage from '../pages/PlaygroundPage';
import AjaxFormSubmitPage from '../pages/AjaxFormSubmitPage';
import urlLinks from '../data/playgroundLinks.json';

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

  test('Ajax Form Submit: Empty name and message - Text *', async ({ page }, testInfo) => {
    const playgroundPage = new PlaygroundPage(page);
    const ajaxFormSubmitPage = new AjaxFormSubmitPage(page);
    await playgroundPage.open();
    await playgroundPage.AjaxFormSubmit.click();
    await ajaxFormSubmitPage.clickSubmitBtn();
    await ajaxFormSubmitPage.validateRequiredName();
  });

  test('Ajax Form Submit: Empty name and message - UI Textbox Border', async ({ page }, testInfo) => {
    const playgroundPage = new PlaygroundPage(page);
    const ajaxFormSubmitPage = new AjaxFormSubmitPage(page);
    await playgroundPage.open();
    await playgroundPage.AjaxFormSubmit.click();
    await ajaxFormSubmitPage.clickSubmitBtn();
    await ajaxFormSubmitPage.validateTextBorder();
  });

});