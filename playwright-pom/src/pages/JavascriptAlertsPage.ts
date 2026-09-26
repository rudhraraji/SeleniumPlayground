import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JavascriptAlertsPage extends BasePage {
  readonly url = appUrl('selenium-playground/javascript-alert-box-demo/');
  readonly heading: Locator;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Javascript Alert Box Demo',
      exact: true,
    });
    const buttons = page.locator('main button', { hasText: 'Click Me' });
    this.alertButton = buttons.nth(0);
    this.confirmButton = buttons.nth(1);
    this.promptButton = buttons.nth(2);
    this.result = page.locator('main').getByText(/You pressed|You have entered/);
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
