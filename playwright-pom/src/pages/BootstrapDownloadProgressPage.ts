import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapDownloadProgressPage extends BasePage {
  readonly url = appUrl('selenium-playground/bootstrap-download-progress-demo/');
  readonly heading: Locator;
  readonly startDownloadButton: Locator;
  readonly progressCounter: Locator;
  readonly progressBar: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Bootstrap Download Progress Demo', exact: true });
    this.startDownloadButton = page.locator('#dwnBtn');
    this.progressCounter = page.locator('.counter');
    this.progressBar = page.locator('.bar');
    this.successMessage = page.locator('.success');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
