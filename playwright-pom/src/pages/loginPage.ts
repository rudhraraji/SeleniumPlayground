import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  readonly url = 'https://www.testmuai.com/login';

  readonly usernameInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly playgroundLink: Locator;
  readonly playgroundRoleLink: Locator;
  readonly playgroundTextLink: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.locator('input[type="email"], input[name="email"], input[name="username"]');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.passwordInput = this.page.locator('input[type="password"], input[name="password"]');
    this.loginButton = this.page.getByRole('button', { name: /login|sign in/i });
    this.forgotPasswordLink = this.page.locator('a:has-text("Forgot")');

    // Example link selectors using the locator patterns you mentioned
    this.playgroundLink = this.page.locator('[data-testid="playground-link"]');
    this.playgroundRoleLink = this.page.getByRole('link', { name: 'Selenium Playground' });
    this.playgroundTextLink = this.page.locator('a:has-text("Playground")');
  }

  async open() {
    await this.navigateTo(this.url);
  }

  async enterUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.type(username, { delay: 50 });
    await this.usernameInput.press('Enter');
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.enterPassword(password);
    await this.submitLogin();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}
