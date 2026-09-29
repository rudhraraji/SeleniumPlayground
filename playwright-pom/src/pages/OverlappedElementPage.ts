import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class OverlappedElementPage extends BasePage {
  readonly url = appUrl('selenium-playground/overlapped-element/');
  readonly heading: Locator;
  readonly scrollableFields: Locator;
  readonly idInput: Locator;
  readonly nameInput: Locator;
  readonly subjectInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Overlapped Element', exact: true });
    this.scrollableFields = page.locator('div.h-100.overflow-y-scroll');
    this.idInput = page.locator('#id');
    this.nameInput = page.locator('#name');
    this.subjectInput = page.locator('#subject');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }

  async scrollFieldsToBottom(): Promise<void> {
    await this.scrollableFields.evaluate(element => {
      element.scrollTop = element.scrollHeight;
    });
  }
}
