import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class VirtualDomPage extends BasePage {
  readonly url = appUrl('selenium-playground/virtual-dom/');
  readonly heading: Locator;
  readonly timeReadouts: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Virtual DOM', exact: true });
    this.timeReadouts = page.locator('h1, h2, h3').filter({ hasText: 'Current Time' });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
