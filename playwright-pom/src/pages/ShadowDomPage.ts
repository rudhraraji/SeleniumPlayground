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
    this.nameInput = this.shadowHost.locator('input[placeholder="Name"]');
    this.emailInput = this.shadowHost.locator('input[placeholder="Email"]');
    this.slider = this.shadowHost.locator('input[type="range"]');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.heading).toBeVisible();
    await expect(this.shadowHost).toBeVisible();
    await expect(this.nameInput).toBeEditable();
    await expect(this.emailInput).toBeEditable();
    await expect(this.slider).toBeVisible();
  }

  async fillContactDetails(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async setSliderValue(value: string): Promise<void> {
    await this.slider.fill(value);
  }
}
