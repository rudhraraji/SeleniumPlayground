import { expect, test } from '../fixtures/test';
import JqueryDropdownSearchPage from '../pages/JqueryDropdownSearchPage';

test.describe('JQuery Dropdown Search Demo', () => {
  test('selects multiple states and a categorized option', async ({ page }) => {
    const dropdownPage = new JqueryDropdownSearchPage(page);
    await dropdownPage.open();

    await dropdownPage.multipleStates.selectOption(['CA', 'NY']);
    await expect(
      dropdownPage.multipleStates.locator('option:checked')
    ).toHaveText(['California', 'New York']);

    await dropdownPage.fileCategory.selectOption({ label: 'Java' });
    await expect(dropdownPage.fileCategory.locator('option:checked')).toHaveText('Java');
  });

  test('keeps disabled country options unavailable', async ({ page }) => {
    const dropdownPage = new JqueryDropdownSearchPage(page);
    await dropdownPage.open();
    const disabledCountryOptions = page.locator('select.js-example-disabled-results option:disabled');

    await expect(disabledCountryOptions).toHaveCount(2);
    await expect(disabledCountryOptions.nth(0)).toHaveText('Guam');
    await expect(disabledCountryOptions.nth(1)).toHaveText('United States Minor Outlying Islands');
  });
});
