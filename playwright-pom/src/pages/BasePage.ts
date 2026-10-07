import { expect, Locator, Page, test } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
  //  console.log(`[Page] ${this.constructor.name} opening ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    const heading = await this.page.locator('h1').evaluateAll(headings => headings[0]?.textContent?.trim());
    console.log(`${heading || this.constructor.name} | ${test.info().title}`);
  }

  async openPage(url: string, readyLocator: Locator): Promise<void> {
    await this.navigateTo(url);
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('networkidle');
    await expect(readyLocator).toBeVisible();
  }

  async click(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}