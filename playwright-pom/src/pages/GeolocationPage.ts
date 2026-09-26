import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class GeolocationPage extends BasePage {
  readonly url = appUrl('selenium-playground/geolocation-testing/');
  readonly heading: Locator;
  readonly fields: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Geolocation Testing',
      exact: true,
    });
    this.fields = page.locator('main p').filter({
      hasText: /^(IP Address|Country Name|Country Code|Latitude|longitude):/,
    });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
