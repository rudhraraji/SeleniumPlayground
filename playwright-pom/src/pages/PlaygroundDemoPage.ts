import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class PlaygroundDemoPage extends BasePage {
  readonly url: string;
  private readonly expectedPath: string;

  constructor(page: Page, path: string) {
    super(page);
    this.url = appUrl(`selenium-playground/${path}`);
    this.expectedPath = new URL(this.url).pathname;
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
  }

  async validatePageLoaded(): Promise<void> {
    await expect.poll(() => new URL(this.page.url()).pathname).toBe(this.expectedPath);

    if (this.expectedPath.endsWith('/nested-frames/')) {
      await expect.poll(() => this.page.frames().length).toBeGreaterThan(1);
      return;
    }

    await expect(this.page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  }
}
