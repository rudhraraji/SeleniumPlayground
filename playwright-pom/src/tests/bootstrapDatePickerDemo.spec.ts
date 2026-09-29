import { expect, test } from '@playwright/test';
import BootstrapDatePickerDemoPage from '../pages/BootstrapDatePickerDemoPage';

test('Bootstrap Date Picker Demo › selects and clears a single date', async ({ page }) => {
  const datePickerPage = new BootstrapDatePickerDemoPage(page);
  await datePickerPage.open();

  await expect(datePickerPage.singleDateInput).toBeVisible();
  await expect(datePickerPage.singleDateInput).toHaveAttribute('readonly', '');
  await datePickerPage.singleDateInput.click();
  await expect(datePickerPage.calendar).toBeVisible();
  await expect(datePickerPage.todayDate).toBeVisible();
  await datePickerPage.todayDate.click();
  await expect(datePickerPage.singleDateInput).toHaveValue(/^\d{2}\/\d{2}\/\d{4}$/);

  await datePickerPage.singleDateInput.click();
  await datePickerPage.clearDateButton.click();
  await expect(datePickerPage.singleDateInput).toHaveValue('');
});

test('Bootstrap Date Picker Demo › accepts a start and end date range', async ({ page }) => {
  const datePickerPage = new BootstrapDatePickerDemoPage(page);
  await datePickerPage.open();

  await expect(datePickerPage.startDateInput).toBeVisible();
  await expect(datePickerPage.endDateInput).toBeVisible();
  await expect(datePickerPage.startDateInput).toBeEditable();
  await expect(datePickerPage.endDateInput).toBeEditable();
  await datePickerPage.startDateInput.fill('09/28/2026');
  await datePickerPage.endDateInput.fill('09/30/2026');
  await expect(datePickerPage.startDateInput).toHaveValue('09/28/2026');
  await expect(datePickerPage.endDateInput).toHaveValue('09/30/2026');
});
