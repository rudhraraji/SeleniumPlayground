import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class DashboardPage extends BasePage {
  readonly userEmail: Locator;
  readonly accountSummary: Locator;

  constructor(page: Page) {
    super(page);

    this.userEmail = page.locator('[data-testid="user-email"]');
    this.accountSummary = page.locator('[data-testid="account-summary"]');
  }

  async waitForDashboard() {
    await expect.poll(async () => this.page.url(), { timeout: 30000 }).toContain('/dashboard');
  }

  async validateHomeHeading() {
    await expect(this.page.getByRole('heading', { name: /^Home$/i })).toBeVisible();
  }

  async validateUserIdentity() {
    await expect(
      this.page.getByRole('button', { name: /RR|profile/i })
    ).toBeVisible();
  }

  async validateUserEmail(expectedEmail: string) {
    await expect(this.userEmail).toContainText(expectedEmail);
  }
}