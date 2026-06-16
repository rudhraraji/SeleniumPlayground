import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class PlaygroundPage extends BasePage {
  readonly url = 'https://www.testmuai.com/selenium-playground/';

 // readonly page: Page;
  readonly canonicalLink: Locator;

  // // Column#1
   readonly heading: Locator;
 


  constructor(page: Page) {
    super(page);
    this.canonicalLink = page.locator('link[rel="canonical"]');
    this.heading = page.getByRole('heading', { name: 'Selenium Playground' });
  }

  async open() {
    await this.navigateTo(this.url);
  }

  async validatePageURL(expectedPageURL: string) {
    const href = await this.canonicalLink.getAttribute('href');
    if (!href) throw new Error('Canonical link href attribute not found');
    expect(href.startsWith(this.url)).toBe(true);
    const actualPageURL = href.replace(this.url, '').replace(/\/$/, '');
    expect(actualPageURL).toBe(expectedPageURL);
  }

  async validateHeading() {
    await expect(this.heading).toContainText('Selenium Playground');
  }

  async clickLinkByName(name: string) {
    const link = this.page.getByRole('link', { name, exact: true });
    await this.click(link);
  }

  // Validate that the target page address matches our expected end subpath
  async validatePageURLs(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath + '$'));
  }

  async getTitle() {
    return this.page.title();
  }

  async close() {
    await this.page.close();
  }
}