import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TablePaginationPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-pagination-demo/');
  readonly heading: Locator;
  readonly rowsPerPageSelect: Locator;
  readonly tableHeaders: Locator;
  readonly visibleRows: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Pagination Demo', exact: true });
    this.rowsPerPageSelect = page.locator('#maxRows');
    this.tableHeaders = page.locator('table thead th');
    this.visibleRows = page.locator('table tbody tr:visible');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
