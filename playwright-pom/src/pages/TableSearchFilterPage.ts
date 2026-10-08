import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TableSearchFilterPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-search-filter-demo/');
  readonly heading: Locator;
  readonly taskFilter: Locator;
  readonly taskRows: Locator;
  readonly taskTable: Locator;
  readonly taskHeaders: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Search filter', exact: true });
    this.taskFilter = page.getByPlaceholder('Filter by Task / Assignee / Status');
    this.taskTable = page.locator('#task-table');
    this.taskHeaders = this.taskTable.locator('thead th');
    this.taskRows = this.taskTable.locator('tbody tr');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.taskFilter).toBeVisible();
    await expect(this.taskFilter).toBeEditable();
    await expect(this.taskTable).toBeVisible();
    await expect(this.taskHeaders).toHaveCount(4);
    await expect(this.taskRows).toHaveCount(7);
  }

  async filterTasks(query: string): Promise<void> {
    await this.taskFilter.fill(query);
  }

  async clearTaskFilter(): Promise<void> {
    await this.taskFilter.clear();
  }
}
