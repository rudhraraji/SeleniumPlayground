import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
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
    this.page = page;

    this.usernameInput = this.page.locator('input[type="email"], input[name="email"], input[name="username"]');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.passwordInput = this.page.locator('input[type="password"], input[name="password"]');
    this.loginButton = this.page.getByRole('button', { name: /login|sign in/i });
    this.forgotPasswordLink = this.page.locator('a:has-text("Forgot")');

    this.playgroundLink = this.page.locator('[data-testid="playground-link"]');
    this.playgroundRoleLink = this.page.getByRole('link', { name: 'Selenium Playground' });
    this.playgroundTextLink = this.page.locator('a:has-text("Playground")');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  // Enter username -> click Continue -> wait for password -> fill password -> submit
  async login(username: string, password: string) {
    // Wait for username input and fill
    await this.usernameInput.first().waitFor({ state: 'visible', timeout: 7000 });
    await this.usernameInput.first().fill(username);

    // If Continue button exists and is actionable, click it (two-step flow)
    if ((await this.continueButton.count()) > 0) {
      try {
        const btn = this.continueButton.first();
        if (await btn.isVisible() && await btn.isEnabled()) {
          await Promise.all([
            btn.click(),
            this.page.waitForTimeout(300), // allow UI to update
          ]);
        }
      } catch {
        // ignore and continue to wait for password
      }
    }

    // After clicking Continue, wait for either:
    //  - password input to appear, OR
    //  - a navigation away from the login page (some flows redirect)
    // Use a reasonably long timeout to avoid flaky failures.
    const waitTimeout = 20000;
    let passwordAppeared = false;
    try {
      const raceResult = await Promise.race([
        this.passwordInput.first().waitFor({ state: 'visible', timeout: waitTimeout }).then(() => 'password'),
        this.page.waitForNavigation({ timeout: waitTimeout }).then(() => 'navigation'),
      ]);
      if (raceResult === 'password') {
        passwordAppeared = true;
      } else if (raceResult === 'navigation') {
        // navigated away after Continue — cannot fill password here, assume flow continued
        return;
      }
    } catch {
      // timed out or other error — we'll do additional checks below
    }

    // Additional quick check in case waitFor didn't catch a now-visible element
    if (!passwordAppeared) {
      try {
        if ((await this.passwordInput.count()) > 0 && await this.passwordInput.first().isVisible()) {
          passwordAppeared = true;
        }
      } catch {
        // ignore
      }
    }

    if (!passwordAppeared) {
      // If login button is visible but no password, give a helpful message.
      if ((await this.loginButton.count()) > 0 && await this.loginButton.first().isVisible()) {
        throw new Error(
          'Password input did not appear after clicking Continue, but a login button is visible. ' +
            'Check selectors or increase timeouts. (Consider inspecting the page to confirm the password selector.)'
        );
      }
      throw new Error('Password input did not appear after entering username and clicking Continue.');
    }

    // Fill password
    await this.passwordInput.first().fill(password);

    // Submit: prefer login button, otherwise press Enter
    if ((await this.loginButton.count()) > 0 && await this.loginButton.first().isVisible()) {
      await Promise.all([
        this.page.waitForLoadState('networkidle').catch(() => {}),
        this.loginButton.first().click(),
      ]);
    } else {
      await Promise.all([
        this.page.waitForLoadState('networkidle').catch(() => {}),
        this.passwordInput.first().press('Enter'),
      ]);
    }

    // short stabilization wait
    await this.page.waitForTimeout(300);
  }

  async goToPlayground() {
    if ((await this.playgroundRoleLink.count()) > 0 && await this.playgroundRoleLink.first().isVisible()) {
      await this.playgroundRoleLink.first().click();
      return;
    }
    if ((await this.playgroundTextLink.count()) > 0 && await this.playgroundTextLink.first().isVisible()) {
      await this.playgroundTextLink.first().click();
      return;
    }
    if ((await this.playgroundLink.count()) > 0 && await this.playgroundLink.first().isVisible()) {
      await this.playgroundLink.first().click();
    }
  }
}