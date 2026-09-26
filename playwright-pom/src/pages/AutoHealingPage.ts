import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class AutoHealingPage extends BasePage {
  readonly url = appUrl('selenium-playground/auto-healing/');
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly changeDomId: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Auto Healing', exact: true });
    this.usernameInput = page.locator('input[name="name"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.changeDomId = page.locator('main p.cursor-pointer').filter({
      hasText: 'Change DOM ID',
    });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
