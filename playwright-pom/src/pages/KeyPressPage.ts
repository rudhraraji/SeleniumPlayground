import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class KeyPressPage extends BasePage {
  readonly url = appUrl('selenium-playground/key-press/');
  readonly heading: Locator;
  readonly keyInput: Locator;
  readonly keyResult: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Key Press', exact: true });
    this.keyInput = page.locator('#my_field');
    this.keyResult = page.locator('#result');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.waitForPageLoad();
    await expect(this.heading).toBeVisible();
  }
}
