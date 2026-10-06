import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDualListBoxPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-dual-list-box-demo/');
  readonly heading: Locator;
  readonly availableItems: Locator;
  readonly selectedItems: Locator;
  readonly addButton: Locator;
  readonly addAllButton: Locator;
  readonly removeButton: Locator;
  readonly removeAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'JQuery Dual List Box', exact: true });
    this.availableItems = page.locator('main select').nth(0);
    this.selectedItems = page.locator('main select').nth(1);
    this.addButton = page.getByRole('button', { name: 'Add', exact: true });
    this.addAllButton = page.getByRole('button', { name: 'Add All', exact: true });
    this.removeButton = page.getByRole('button', { name: 'Remove', exact: true });
    this.removeAllButton = page.getByRole('button', { name: 'Remove All', exact: true });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
