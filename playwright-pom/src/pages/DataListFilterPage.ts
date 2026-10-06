import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class DataListFilterPage extends BasePage {
  readonly url = appUrl('selenium-playground/data-list-filter-demo/');
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly attendeeCards: Locator;
  readonly attendeeNames: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Data List Filter', exact: true });
    this.searchInput = page.locator('#input-search');
    this.attendeeCards = page.locator('.items');
    this.attendeeNames = page.locator('main h4');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
