import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class AutoHealingPage extends BasePage {
  readonly url = appUrl('selenium-playground/auto-healing/');
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly healedUsernameInput: Locator;
  readonly usernameField: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly submissionResult: Locator;
  readonly changeDomId: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Auto Healing', exact: true });
    this.usernameInput = page.locator('#username');
    this.healedUsernameInput = page.locator('#lambdatest');
    this.usernameField = page.locator('form .form-group')
      .filter({ has: page.getByText('Username*', { exact: true }) })
      .locator('input');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
    this.submissionResult = page.getByText('Login Successful', { exact: true });
    this.changeDomId = page.locator('main p.cursor-pointer').filter({
      hasText: 'Change DOM ID',
    });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
