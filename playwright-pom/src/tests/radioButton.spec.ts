import { expect, test } from '../fixtures/test';
import RadioButtonPage from '../pages/RadioButtonPage';

test.describe('Radio Button Demo', () => {
  let radioButtonPage: RadioButtonPage;

  test.beforeEach(async ({ page }) => {
    radioButtonPage = new RadioButtonPage(page);
    await radioButtonPage.open();
  });

  test('loads the radio button controls', async () => {
    await expect(radioButtonPage.basicRadioButtons).toHaveCount(2);
    await expect(radioButtonPage.disabledRadioButton).toBeDisabled();
    await expect(radioButtonPage.getValuesButton).toBeEnabled();
  });

  test('reports the selected gender and age group', async () => {
    await radioButtonPage.checkGenderAndAge('Female', '5 - 15');
    await radioButtonPage.expectResults('Female', '5 - 15');
  });
});
