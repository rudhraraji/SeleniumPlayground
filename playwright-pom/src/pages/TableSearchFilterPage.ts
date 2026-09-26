import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class TableSearchFilterPage extends BasePage {
  readonly url = appUrl('selenium-playground/table-search-filter-demo/');
  readonly heading: Locator;
  readonly taskFilter: Locator;
  readonly taskRows: Locator;
  readonly taskTable: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Table Search filter', exact: true });
    this.taskFilter = page.getByPlaceholder('Filter by Task / Assignee / Status');
    this.taskTable = page.locator('#task-table');
    this.taskRows = this.taskTable.locator('tbody tr');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
