import { expect, Locator, Page } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
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
   async waitForElement(selector: string): Promise<void> {
     await this.page.locator(selector).waitFor({ state: 'visible' });
   }

   async fill(selector: string, value: string): Promise<void> {
     await this.page.locator(selector).fill(value);
   }

   async getText(selector: string): Promise<string | null> {
     return this.page.locator(selector).textContent();
   }

   async goto(url: string): Promise<void> {
     await this.navigateTo(url);
   }

   async type(locator: Locator, value: string): Promise<void> {
     await expect(locator).toBeVisible();
     await locator.fill(value);
   }

   async shouldBeVisible(locator: Locator): Promise<void> {
     await expect(locator).toBeVisible();
   }

   async shouldContainText(locator: Locator, text: string): Promise<void> {
     await expect(locator).toContainText(text);
   }

   async shouldHaveCSS(locator: Locator, property: string, value: string): Promise<void> {
     await expect(locator).toHaveCSS(property, value);
   }
}