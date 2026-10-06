import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TableSortSearchPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-sort-search-demo/');
  readonly heading: Locator;
  readonly table: Locator;
  readonly nameHeader: Locator;
  readonly searchInput: Locator;
  readonly visibleRows: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Sorting And Searching', exact: true });
    this.table = page.locator('#example');
    this.nameHeader = this.table.locator('thead th').first();
    this.searchInput = page.locator('#example_filter input[type="search"]');
    this.visibleRows = this.table.locator('tbody tr:visible');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
