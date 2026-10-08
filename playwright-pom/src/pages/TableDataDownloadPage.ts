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
    await this.openPage(this.url, this.heading);
    await expect(this.table).toBeVisible();
    await expect(this.tableHeaders).toHaveCount(6);
    await expect(this.tableRows.first()).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.csvExportButton).toBeVisible();
  }

  async searchRows(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async exportCsv(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.csvExportButton.click();
    const download = await downloadPromise;
    return download.suggestedFilename();
  }
}
