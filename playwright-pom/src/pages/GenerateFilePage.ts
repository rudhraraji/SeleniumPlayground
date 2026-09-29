import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class GenerateFilePage extends BasePage {
  readonly url = appUrl('selenium-playground/generate-file-to-download-demo/');
  readonly heading: Locator;
  readonly textArea: Locator;
  readonly remainingCharacters: Locator;
  readonly generateButton: Locator;
  readonly downloadLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'File Download Demo', exact: true });
    this.textArea = page.locator('#textbox');
    this.remainingCharacters = page.locator('main').getByText(/characters remaining/);
    this.generateButton = page.locator('#create');
    this.downloadLink = page.locator('#link-to-download');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }

  async enterText(value: string): Promise<void> {
    await this.textArea.fill('');
    await this.textArea.pressSequentially(value);
  }
}
