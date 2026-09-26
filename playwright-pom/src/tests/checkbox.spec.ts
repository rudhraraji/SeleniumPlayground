import { expect, test } from '@playwright/test';
import CheckboxPage from '../pages/CheckboxPage';

test.describe('Checkbox Demo', () => {
  let checkboxPage: CheckboxPage;

  test.beforeEach(async ({ page }) => {
    checkboxPage = new CheckboxPage(page);
    await checkboxPage.open();
  });

  test('single checkbox can be checked and unchecked', async ({ page }) => {
    const checkbox = checkboxPage.singleCheckbox;

    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('disabled demo options cannot be changed', async ({ page }) => {
    const options = checkboxPage.disabledOptions;

    await expect(options).toHaveCount(2);
    for (let index = 0; index < 2; index += 1) {
      await expect(options.nth(index)).toBeDisabled();
      await expect(options.nth(index)).not.toBeChecked();
    }
  });

  test('multiple checkbox options can be selected independently', async ({ page }) => {
    const options = checkboxPage.multipleOptions;

    await expect(options).toHaveCount(4);

    for (let index = 0; index < 4; index += 1) {
      await options.nth(index).check();
      await expect(options.nth(index)).toBeChecked();
    }
  });
});
