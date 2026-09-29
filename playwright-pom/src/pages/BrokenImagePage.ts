import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BrokenImagePage extends BasePage {
  readonly url = appUrl('selenium-playground/broken-image/');
  readonly heading: Locator;
  readonly imageWithAltHeading: Locator;
  readonly imageWithoutAltHeading: Locator;
  readonly brokenImages: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Broken Images', exact: true });
    this.imageWithAltHeading = page.getByRole('heading', { name: 'Broken Image with Alt', exact: true });
    this.imageWithoutAltHeading = page.getByRole('heading', { name: 'Broken Image without Alt', exact: true });
    this.brokenImages = page.locator('img[src="abcd.jpg"]');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
