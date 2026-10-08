import { expect, test } from '../fixtures/test';
import SelectDropdownDemoPage from '../pages/SelectDropdownDemoPage';

test.describe('Dropdown Demo', () => {
  let dropdownPage: SelectDropdownDemoPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new SelectDropdownDemoPage(page);
    await dropdownPage.open();
  });

  test('selects a day from the single-select dropdown', async () => {
    await dropdownPage.selectDay('Tuesday');
    await expect(dropdownPage.daySelect).toHaveValue('Tuesday');
  });

  test('selects multiple states and keeps each selection checked', async () => {
    await dropdownPage.selectStates(['California', 'Texas']);
    await expect(dropdownPage.multiSelect.locator('option:checked')).toHaveText([
      'California',
      'Texas',
    ]);

    await dropdownPage.showFirstSelectedState();
    await dropdownPage.showAllSelectedStates();
    await expect(dropdownPage.multiSelect.locator('option:checked')).toHaveText([
      'California',
      'Texas',
    ]);
  });
});
