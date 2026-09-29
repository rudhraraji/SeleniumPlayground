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
  readonly cancelDownloadButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Jquery Download Progress-Bar Demo', exact: true });
    this.startDownloadButton = page.locator('#downloadButton');
    this.progressDialog = page.locator('.ui-dialog');
    this.dialogTitle = page.locator('.ui-dialog-title');
    this.downloadStatus = page.locator('.ui-dialog-content');
    this.cancelDownloadButton = page.getByRole('button', { name: 'Cancel Download', exact: true });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
