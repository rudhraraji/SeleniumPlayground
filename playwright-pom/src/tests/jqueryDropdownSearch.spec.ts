import { expect, test } from '../fixtures/test';
import JqueryDropdownSearchPage from '../pages/JqueryDropdownSearchPage';

test.describe('JQuery Dropdown Search Demo', () => {
  test('searches and selects a country, multiple states, and a categorized option', async ({ page }) => {
    const dropdownPage = new JqueryDropdownSearchPage(page);
    await dropdownPage.open();

    await dropdownPage.selectCountry('India');
    await expect(dropdownPage.country).toHaveValue('India');

    await dropdownPage.selectStates(['California', 'New York']);
    await expect(
      dropdownPage.multipleStates.locator('option:checked')
    ).toHaveText(['California', 'New York']);

    await dropdownPage.fileCategory.selectOption({ label: 'Java' });
    await expect(dropdownPage.fileCategory.locator('option:checked')).toHaveText('Java');
  });

  test('keeps disabled country options unavailable', async ({ page }) => {
    const dropdownPage = new JqueryDropdownSearchPage(page);
    await dropdownPage.open();

    await expect(dropdownPage.disabledCountryOptions).toHaveCount(2);
    await expect(dropdownPage.disabledCountryOptions.nth(0)).toHaveText('Guam');
    await expect(dropdownPage.disabledCountryOptions.nth(1)).toHaveText(
      'United States Minor Outlying Islands',
    );
  });
});
