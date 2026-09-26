import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class ShadowDomPage extends BasePage {
  readonly url = appUrl('selenium-playground/shadow-dom/');
  readonly heading: Locator;
  readonly shadowHost: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly slider: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Shadow DOM', exact: true });
    this.shadowHost = page.locator('#shadow_host');
    this.nameInput = page.locator('input[placeholder="Name"]').last();
    this.emailInput = page.locator('input[placeholder="Email"]').last();
    this.slider = page.getByRole('slider').first();
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
    await expect(this.shadowHost).toBeVisible();
  }
}
