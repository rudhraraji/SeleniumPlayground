import { expect, test } from '../fixtures/test';
import JqueryDatePickerPage from '../pages/JqueryDatePickerPage';

test('JQuery Date Picker Demo › accepts a date range selected from the calendar', async ({ page }) => {
  const datePickerPage = new JqueryDatePickerPage(page);
  await datePickerPage.open();

  await expect(datePickerPage.fromDateInput).toBeVisible();
  await expect(datePickerPage.toDateInput).toBeVisible();
  await datePickerPage.selectCalendarDate(datePickerPage.fromDateInput, '10/15/2026');
  await datePickerPage.selectCalendarDate(datePickerPage.toDateInput, '10/20/2026');

  await expect(datePickerPage.fromDateInput).toHaveValue('10/15/2026');
  await expect(datePickerPage.toDateInput).toHaveValue('10/20/2026');
});
