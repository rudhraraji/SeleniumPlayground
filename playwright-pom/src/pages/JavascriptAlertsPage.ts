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

  async triggerAlert(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = this.alertButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am an alert box!');
    await dialog.accept();
    await clickPromise;
  }

  async acceptConfirm(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = this.confirmButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Press a button!');
    await dialog.accept();
    await clickPromise;
    await expect(this.result).toHaveText('You pressed OK!');
  }

  async enterPrompt(value: string): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = this.promptButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('Please enter your name');
    await dialog.accept(value);
    await clickPromise;
    await expect(this.result).toHaveText(`You have entered '${value}' !`);
  }
}
