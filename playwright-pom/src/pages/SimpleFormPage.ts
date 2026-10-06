import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class SimpleFormPage extends BasePage {
  readonly url = appUrl('selenium-playground/simple-form-demo/');
  readonly heading: Locator;
  readonly messageInput: Locator;
  readonly showMessageButton: Locator;
  readonly messageResult: Locator;
  readonly firstNumberInput: Locator;
  readonly secondNumberInput: Locator;
  readonly sumButton: Locator;
  readonly sumResult: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Simple Form Demo', exact: true });
    this.messageInput = page.locator('input#user-message');
    this.showMessageButton = page.locator('#showInput');
    this.messageResult = page.locator('#message');
    this.firstNumberInput = page.locator('#sum1');
    this.secondNumberInput = page.locator('#sum2');
    this.sumButton = page.getByRole('button', { name: 'Get Sum', exact: true });
    this.sumResult = page.locator('#addmessage');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
