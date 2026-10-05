import { expect, test } from '../fixtures/test';
import InputFormDemoPage from '../pages/InputFormDemoPage';

test('Input Form Demo › submits valid contact details', async ({ page }) => {
  const formPage = new InputFormDemoPage(page);
  await formPage.open();

  await formPage.nameInput.fill('Playwright User');
  await formPage.emailInput.fill('playwright@example.com');
  await formPage.passwordInput.fill('Example123!');
  await formPage.companyInput.fill('QA Team');
  await formPage.websiteInput.fill('https://example.com');
  await formPage.countrySelect.selectOption({ label: 'Australia' });
  await formPage.cityInput.fill('Sydney');
  await formPage.addressLine1Input.fill('1 Test Street');
  await formPage.addressLine2Input.fill('Suite 2');
  await formPage.stateInput.fill('NSW');
  await formPage.zipInput.fill('2000');
  await formPage.submitButton.click();

  await expect(formPage.successMessage).toBeVisible();
});
