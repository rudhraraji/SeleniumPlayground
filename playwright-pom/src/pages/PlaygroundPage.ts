import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class PlaygroundPage extends BasePage {
  readonly url = appUrl('selenium-playground/');

  readonly canonicalLink: Locator;

  readonly heading: Locator;
  readonly AjaxFormSubmit: Locator;
  readonly BootstrapListBox: Locator;

  constructor(page: Page) {
    super(page);
    this.canonicalLink = page.locator('link[rel="canonical"]');
    this.heading = page.getByRole('heading', { name: 'Selenium Playground' });
    this.AjaxFormSubmit = this.page.getByRole('link', { name: 'Ajax Form Submit' });
    this.BootstrapListBox = this.page.getByRole('link', { name: 'Bootstrap List Box' });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
  }

  async validatePageURL(expectedPageURL: string): Promise<void> {
    const href = await this.canonicalLink.getAttribute('href');
    if (!href) throw new Error('Canonical link href attribute not found');
    expect(href.startsWith(this.url)).toBe(true);
    const actualPageURL = href.replace(this.url, '').replace(/\/$/, '');
    expect(actualPageURL).toBe(expectedPageURL);
  }

  async validateHeading(): Promise<void> {
    await expect(this.heading).toContainText('Selenium Playground');
  }

  async clickLink(name: string): Promise<void> {
    const link = this.page.getByRole('link', { name, exact: true });
    await this.click(link);
  }

  // Validate that the target page address matches our expected end subpath
  async validatePageURLs(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath + '$'));
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async close(): Promise<void> {
    await this.page.close();
  }
}