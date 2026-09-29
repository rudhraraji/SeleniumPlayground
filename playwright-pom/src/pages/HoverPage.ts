import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class HoverPage extends BasePage {
  readonly url = appUrl('selenium-playground/hover-demo/');
  readonly heading: Locator;
  readonly hoverTargets: Locator;
  readonly hoverImages: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Mouse Hover', exact: true });
    this.hoverTargets = page.getByText('Hover Me', { exact: true });
    this.hoverImages = page.locator('figure img[alt="Image"]');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
