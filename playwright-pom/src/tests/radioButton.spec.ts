import { expect, test } from '@playwright/test';
import RadioButtonPage from '../pages/RadioButtonPage';

test('Radio Button Demo › reports the selected gender and age group', async ({ page }) => {
  const radioButtonPage = new RadioButtonPage(page);
  await radioButtonPage.open();

  await expect(radioButtonPage.basicRadioButtons).toHaveCount(2);
  await expect(radioButtonPage.disabledRadioButton).toBeDisabled();
  await radioButtonPage.genderRadioButtons.nth(1).check();
  await radioButtonPage.ageRadioButtons.nth(1).check();
  await radioButtonPage.getValuesButton.click();
  await expect(page.locator('main')).toContainText('Gender : Female');
  await expect(page.locator('main')).toContainText('Age : 5 - 15');
});
