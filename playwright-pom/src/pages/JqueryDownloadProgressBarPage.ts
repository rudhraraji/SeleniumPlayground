import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDownloadProgressBarPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-download-progress-bar-demo/');
  readonly heading: Locator;
  readonly startDownloadButton: Locator;
  readonly progressDialog: Locator;
  readonly dialogTitle: Locator;
  readonly downloadStatus: Locator;
  readonly progressBar: Locator;
  readonly cancelDownloadButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: /Jquery Download Progress-Bar Demo/i,
    });
    this.startDownloadButton = page.locator('#downloadButton');
    this.progressDialog = page.getByRole('dialog');
    this.dialogTitle = this.progressDialog.locator('.ui-dialog-title');
    this.downloadStatus = this.progressDialog.locator('.progress-label');
    this.progressBar = this.progressDialog.getByRole('progressbar');
    this.cancelDownloadButton = this.progressDialog.getByRole('button', { name: 'Cancel Download', exact: true });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }

  async startDownload(): Promise<void> {
    await this.startDownloadButton.click();
    await expect(this.progressDialog).toBeVisible();
  }

  async cancelDownload(): Promise<void> {
    await this.cancelDownloadButton.click();
    await expect(this.progressDialog).toBeHidden();
  }
}
