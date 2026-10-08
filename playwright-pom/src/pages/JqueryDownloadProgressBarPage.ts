import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDownloadProgressBarPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-download-progress-bar-demo/');
  readonly heading: Locator;
  readonly startDownloadButton: Locator;
  readonly progressDialog: Locator;
  readonly downloadStatus: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: /Jquery Download Progress-Bar Demo/i,
    });
    this.startDownloadButton = page.locator('#downloadButton');
    this.progressDialog = page.locator('#dialog');
    this.downloadStatus = this.progressDialog.locator('.progress-label');
    this.progressBar = this.progressDialog.locator('#progressbar');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.startDownloadButton).toBeVisible();
    await expect(this.startDownloadButton).toBeEnabled();
  }

  async startDownload(): Promise<void> {
    await this.startDownloadButton.click();
    await expect(this.progressDialog).toBeVisible({ timeout: 15000 });
    await expect(this.downloadStatus).toContainText('Starting download...', { timeout: 15000 });
  }
}
