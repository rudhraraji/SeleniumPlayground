import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class PlaygroundPage extends BasePage {
  readonly url = 'https://www.testmuai.com/selenium-playground/';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigateTo(this.url);
  }

  async getTitle() {
    return this.page.title();
  }

  async close() {
    await this.page.close();
  }
}
