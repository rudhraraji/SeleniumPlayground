import { Page, Locator, expect } from '@playwright/test';

export default class DashboardPage {
  readonly page: Page;
  readonly userEmail: Locator;
  readonly accountSummary: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userEmail = page.locator('[data-testid="user-email"]');
    this.accountSummary = page.locator('[data-testid="account-summary"]');
  }

  async waitForDashboard() {
    await this.page.waitForURL('**/dashboard');
  }

  async validateHomeHeading() {
    await expect(this.page.getByRole('heading', { name: 'Home' })).toBeVisible();
  }

  async validateUserEmail(expectedEmail: string) {
    await expect(this.userEmail).toContainText(expectedEmail);
  }
}