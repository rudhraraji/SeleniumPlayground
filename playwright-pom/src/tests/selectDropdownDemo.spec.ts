import { expect, test } from '../fixtures/test';
import SelectDropdownDemoPage from '../pages/SelectDropdownDemoPage';

test('Dropdown Demo › selects a day and multiple states', async ({ page }) => {
  const dropdownPage = new SelectDropdownDemoPage(page);
  await dropdownPage.open();

  await dropdownPage.daySelect.selectOption('Tuesday');
  await expect(dropdownPage.daySelect).toHaveValue('Tuesday');
  await dropdownPage.multiSelect.selectOption(['California', 'Texas']);
  await expect(dropdownPage.multiSelect.locator('option:checked')).toHaveText(['California', 'Texas']);
});
