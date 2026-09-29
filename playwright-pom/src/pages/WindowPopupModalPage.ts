import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class WindowPopupModalPage extends BasePage {
  readonly url = appUrl('selenium-playground/window-popup-modal-demo/');
  readonly heading: Locator;
  readonly applicationError: Locator;
  readonly customUrlInput: Locator;
  readonly openUrlLink: Locator;
  readonly singleWindowLinks: Locator;
  readonly multipleWindowLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Window popup Modal', exact: true });
    this.applicationError = page.getByRole('heading', {
      name: /Application error: a client-side exception has occurred/,
    });
    this.customUrlInput = page.getByPlaceholder('e.g. www.google.com');
    this.openUrlLink = page.getByRole('link', { name: 'Open URL', exact: true });
    this.singleWindowLinks = page.locator('a[title^="Follow @testmuai"]');
    this.multipleWindowLinks = page.locator('a[title^="Follow Twitter"], a[title="Follow All"]');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    if (await this.applicationError.isVisible()) {
      await this.page.reload({ waitUntil: 'networkidle' });
    }
    await expect(this.heading).toBeVisible();
  }
}
