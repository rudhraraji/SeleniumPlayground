import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDatePickerPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-date-picker-demo/');
  readonly heading: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'JQuery Date Picker Demo', exact: true });
    this.fromDateInput = page.locator('input#from');
    this.toDateInput = page.locator('input#to');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
