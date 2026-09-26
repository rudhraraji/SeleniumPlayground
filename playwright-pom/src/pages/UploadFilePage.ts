import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class UploadFilePage extends BasePage {
  readonly url = appUrl('selenium-playground/upload-file-demo/');
  readonly heading: Locator;
  readonly fileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Upload File Demo', exact: true });
    this.fileInput = page.locator('#file');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
    await expect(this.fileInput).toBeVisible();
  }
}
