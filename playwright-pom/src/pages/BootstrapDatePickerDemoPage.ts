import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapDatePickerDemoPage extends BasePage {
  readonly url = appUrl('selenium-playground/bootstrap-date-picker-demo/');
  readonly heading: Locator;
  readonly singleDateInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly calendar: Locator;
  readonly todayDate: Locator;
  readonly clearDateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Bootstrap Date Pickers Demo', exact: true });
    this.singleDateInput = page.getByPlaceholder('dd/mm/yyyy');
    this.startDateInput = page.getByPlaceholder('Start date');
    this.endDateInput = page.getByPlaceholder('End date');
    this.calendar = page.locator('.datepicker');
    this.todayDate = this.calendar.locator('.datepicker-days td.today');
    this.clearDateButton = this.calendar.locator('.datepicker-days tfoot .clear');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.waitForPageLoad();
    await expect(this.heading).toBeVisible();
  }
}
