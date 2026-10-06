import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDatePickerPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-date-picker-demo/');
  readonly heading: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly datePickerWidget: Locator;
  readonly monthSelector: Locator;
  readonly yearLabel: Locator;
  readonly previousMonthButton: Locator;
  readonly nextMonthButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'JQuery Date Picker Demo', exact: true });
    this.fromDateInput = page.locator('input#from');
    this.toDateInput = page.locator('input#to');
    this.datePickerWidget = page.locator('#ui-datepicker-div');
    this.monthSelector = this.datePickerWidget.locator('.ui-datepicker-month');
    this.yearLabel = this.datePickerWidget.locator('.ui-datepicker-year');
    this.previousMonthButton = this.datePickerWidget.locator('.ui-datepicker-prev');
    this.nextMonthButton = this.datePickerWidget.locator('.ui-datepicker-next');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.waitForPageLoad();
    await expect(this.heading).toBeVisible();
  }

  async openCalendarFor(input: Locator): Promise<void> {
    await expect(input).toBeVisible();
    await input.click();
    await expect(this.datePickerWidget).toBeVisible();
  }

  async selectCalendarDate(input: Locator, dateValue: string): Promise<void> {
    const [monthPart, dayPart, yearPart] = dateValue.split('/');
    const targetMonthIndex = Number(monthPart) - 1;
    const targetDay = Number(dayPart);
    const targetYear = Number(yearPart);

    await this.openCalendarFor(input);

    let currentMonth = Number(await this.monthSelector.inputValue());
    let currentYear = Number((await this.yearLabel.textContent())?.trim() ?? '0');

    while (currentYear < targetYear || (currentYear === targetYear && currentMonth < targetMonthIndex)) {
      await this.nextMonthButton.click();
      currentMonth = Number(await this.monthSelector.inputValue());
      currentYear = Number((await this.yearLabel.textContent())?.trim() ?? '0');
    }

    while (currentYear > targetYear || (currentYear === targetYear && currentMonth > targetMonthIndex)) {
      await this.previousMonthButton.click();
      currentMonth = Number(await this.monthSelector.inputValue());
      currentYear = Number((await this.yearLabel.textContent())?.trim() ?? '0');
    }

    const dateCell = this.datePickerWidget
      .locator(`td[data-month="${targetMonthIndex}"][data-year="${targetYear}"] a.ui-state-default`)
      .filter({ hasText: String(targetDay) });

    await expect(dateCell).toBeVisible();
    await dateCell.click();
    await expect(input).toHaveValue(dateValue);
  }
}
