import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TableDataDownloadPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-data-download-demo/');
  readonly heading: Locator;
  readonly table: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  readonly searchInput: Locator;
  readonly csvExportButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Data Download', exact: true });
    this.table = page.locator('#example');
    this.tableHeaders = this.table.locator('thead th');
    this.tableRows = this.table.locator('tbody tr');
    this.searchInput = page.locator('#example_filter input[type="search"]');
    this.csvExportButton = page.locator('a.buttons-csv');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
