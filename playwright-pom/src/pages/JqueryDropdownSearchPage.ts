import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDropdownSearchPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-dropdown-search-demo/');
  readonly heading: Locator;
  readonly multipleStates: Locator;
  readonly fileCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Jquery Dropdown Search Demo',
      exact: true,
    });
    this.multipleStates = page.locator('select[multiple]');
    this.fileCategory = page.locator('#files');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
