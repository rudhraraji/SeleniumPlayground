import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class RedirectionPage extends BasePage {
  readonly url = appUrl('selenium-playground/redirection/');
  readonly destinationUrl = appUrl('selenium-playground/');
  readonly heading: Locator;
  readonly redirectLink: Locator;
  readonly destinationHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Redirection', exact: true });
    this.redirectLink = page.getByRole('link', { name: 'here', exact: true });
    this.destinationHeading = page.getByRole('heading', {
      name: 'Selenium Playground',
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.redirectLink).toBeVisible();
    await expect(this.redirectLink).toHaveAttribute('href', this.destinationUrl);
  }

  async followRedirect(): Promise<void> {
    await this.redirectLink.click();
    await expect(this.page).toHaveURL(this.destinationUrl);
    await expect(this.destinationHeading).toBeVisible();
  }
}
