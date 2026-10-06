import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class DynamicDataLoadingPage extends BasePage {
  readonly url = appUrl('selenium-playground/dynamic-data-loading-demo/');
  readonly heading: Locator;
  readonly loadUserButton: Locator;
  readonly userDetails: Locator;
  readonly userImage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dynamic Data Loading', exact: true });
    this.loadUserButton = page.locator('#save');
    this.userDetails = page.locator('#loading');
    this.userImage = page.locator('#loading img');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
