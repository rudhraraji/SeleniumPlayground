import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class DownloadFileDemoPage extends BasePage {
  readonly url = appUrl('selenium-playground/download-file-demo/');
  readonly heading: Locator;
  readonly pdfDownloadLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Download File Demo', exact: true });
    this.pdfDownloadLink = page.getByRole('link', { name: 'Download File', exact: true });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
