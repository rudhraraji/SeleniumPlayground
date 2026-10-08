import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TableFilterPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-records-filter-demo/');
  readonly heading: Locator;
  readonly filterButtons: Locator;
  readonly allFilterButton: Locator;
  readonly tableRows: Locator;
  readonly visibleTableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Filter Demo', exact: true }).first();
    this.filterButtons = page.locator('button.btn-filter');
    this.allFilterButton = this.filterButtons.filter({ hasText: 'All' });
    this.tableRows = page.locator('table tbody tr');
    this.visibleTableRows = page.locator('table tbody tr:visible');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.filterButtons).toHaveCount(4);
    await expect(this.allFilterButton).toBeVisible();
    await expect(this.tableRows).toHaveCount(5);
  }

  async filterBy(category: string): Promise<void> {
    const filterButton = this.filterButtons.filter({ hasText: category });
    await expect(filterButton).toBeVisible();
    await filterButton.click();
  }

  async showAllRecords(): Promise<void> {
    await this.allFilterButton.click();
  }
}
