import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

   async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(locator: any) {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
   async waitForElement(selector: string) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  // async click(selector: string) {
  //   await this.page.locator(selector).click();
  // }

  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async getText(selector: string) {
    return await this.page.locator(selector).textContent();
  }

   async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async type(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  async shouldBeVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async shouldContainText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  async shouldHaveCSS(locator: Locator, property: string, value: string) {
    await expect(locator).toHaveCSS(property, value);
  }
}