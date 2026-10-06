import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TableFilterPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-records-filter-demo/');
  readonly heading: Locator;
  readonly filterButtons: Locator;
  readonly tableRows: Locator;
  readonly visibleTableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Filter Demo', exact: true }).first();
    this.filterButtons = page.locator('button.btn-filter');
    this.tableRows = page.locator('table tbody tr');
    this.visibleTableRows = page.locator('table tbody tr:visible');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
