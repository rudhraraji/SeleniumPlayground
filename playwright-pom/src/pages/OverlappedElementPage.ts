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
    await this.openPage(this.url, this.heading);
    await expect(this.idInput).toBeVisible();
    await expect(this.idInput).toBeEditable();
    await expect(this.scrollableFields).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.subjectInput).toBeVisible();
  }

  async scrollFieldsToBottom(): Promise<void> {
    await this.scrollableFields.evaluate(async element => {
      element.scrollTop = element.scrollHeight;
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    });
    await expect(this.subjectInput).toBeInViewport();
  }

  async enterFieldValues(values: { id: string; name: string; subject: string }): Promise<void> {
    await this.idInput.fill(values.id);
    await this.scrollFieldsToBottom();
    await this.nameInput.fill(values.name);
    await this.subjectInput.fill(values.subject);
  }
}
