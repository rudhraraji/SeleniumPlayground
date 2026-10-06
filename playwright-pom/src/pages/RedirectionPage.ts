import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class RedirectionPage extends BasePage {
  readonly url = appUrl('selenium-playground/redirection/');
  readonly destinationUrl = appUrl('selenium-playground/');
  readonly heading: Locator;
  readonly redirectLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Redirection', exact: true });
    this.redirectLink = page.getByRole('link', { name: 'here', exact: true });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
