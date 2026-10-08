import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class StatusCodePage extends BasePage {
  readonly url = appUrl('selenium-playground/status-code/');
  readonly heading: Locator;
  readonly statusCodes: Locator;
  readonly statusDescriptions: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Status Codes', exact: true });
    this.statusCodes = page.locator('main p.text-size-18');
    this.statusDescriptions = page.locator('main p.text-size-16');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.statusCodes).toHaveCount(4);
    await expect(this.statusDescriptions).toHaveCount(4);
  }

  getStatusDescription(statusCode: string): Locator {
    const statusIndex = { '200': 0, '301': 1, '404': 2, '500': 3 }[statusCode];
    if (statusIndex === undefined) {
      throw new Error(`Unsupported status code: ${statusCode}`);
    }
    return this.statusDescriptions.nth(statusIndex);
  }
}
