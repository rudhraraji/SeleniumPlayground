import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';


export default class AjaxFormSubmitPage extends BasePage {

  readonly url = 'https://www.testmuai.com/selenium-playground/ajax-form-submit-demo/';
  readonly page: Page;

  readonly heading: Locator;
  //readonly urlHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Form Submit Demo' });
    //this.urlHeading = page.getByRole('link', { name: 'Ajax Form Submit' });
  }

  async open() {
    await this.navigateTo(this.url);
  }

  async waitForPageToLoad() {
    await this.page.waitForURL('**/ajax-form-submit-demo/');
  }

  async validatePageHeading() {
    await expect(this.heading).toContainText('Form Submit Demo');
  }
}