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
  readonly emailPasswordError: Locator;
  readonly emptyEmailErrorMsg: Locator;
  readonly emptyPasswordErrorMsg: Locator;
  readonly invalidEmailErrorMsg: Locator;
  readonly invalidEmailErrorMsgBeforePass: Locator;
  readonly passwordLengthErrorMsg: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.locator('input[type="email"], input[name="email"], input[name="username"]');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.passwordInput = this.page.locator('input[type="password"], input[name="password"]');
    this.loginButton = this.page.getByRole('button', { name: /login|sign in/i });
    this.forgotPasswordLink = this.page.locator('a:has-text("Forgot")');
    // Invalid email address error messages before password field is visible
    this.invalidEmailErrorMsgBeforePass = this.page.getByText('Please enter a valid email'); // Please enter a valid email address
    // Both email and password are incorrect
    this.emailPasswordError = this.page.getByText('Please enter a correct email'); //Please enter a correct email address and password. Note that the password is case-sensitive
    // Empty email and password error messages
    this.emptyEmailErrorMsg = this.page.getByText('Please enter your email'); //Please enter your email address
    this.emptyPasswordErrorMsg = this.page.getByText('Please enter a desired'); //Please enter a desired password
    // Email address without @ and . error message
    this.invalidEmailErrorMsg = this.page.getByText('Invalid email address'); //Invalid email address
    // Password length should be at least 8 characters error message
    this.passwordLengthErrorMsg = this.page.getByText('Password should be at least 8'); //Password should be at least 8 characters long

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

  async clickDisabledContinue() {
    await this.continueButton.click({ force: true });
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }
  async loginUser(username: string) {
    console.log(`Logging in with username: ${username}`);
    await this.enterUsername(username);
    await this.page.keyboard.press('Tab');
  }

  async loginPass(password: string) {
    console.log(`Logging in with password: ${password}`);
    await this.enterPassword(password);
    await this.page.keyboard.press('Tab');
    await this.submitLogin();
  }

  async login(username: string, password: string) {
    console.log(`Logging in with username: ${username} and password: ${password}`);
    await this.enterUsername(username);
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.enterPassword(password);
    await this.submitLogin();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }
  // Invalid email address error messages before password field is visible
  async verifyInvalidEmailErrorMessageBeforePassword() {
    await expect(this.invalidEmailErrorMsgBeforePass).toContainText(
      'Please enter a valid email address'
    );
  }
  // Both email and password are incorrect
  async verifyEmailErrorMessage() {
    await expect(this.emailPasswordError).toContainText(
      'Please enter a correct email address and password. Note that the password is case-sensitive'
    );
  }

  // Empty email and password error messages
  async verifyEmptyEmailErrorMessage() {
    await expect(this.emptyEmailErrorMsg).toContainText(
      'Please enter your email address'
    );
  }

  async verifyEmptyPasswordErrorMessage() {
    await expect(this.emptyPasswordErrorMsg).toContainText(
      'Please enter a desired password'
    );
  }
  // Email address without @ and . error message
  async verifyInvalidEmailErrorMessage() {
    await expect(this.invalidEmailErrorMsg).toContainText(
      'Invalid email address'
    );
  }
  // Password length should be at least 8 characters error message
  async verifyPasswordLengthErrorMessage() {
    await expect(this.passwordLengthErrorMsg).toContainText(
      'Password should be at least 8 characters long'
    );
  }

}