import { test } from '../fixtures/test';
import InputFormDemoPage, { ContactDetails } from '../pages/InputFormDemoPage';

test('Input Form Demo › submits valid contact details', async ({ page }) => {
  const formPage = new InputFormDemoPage(page);
  const validDetails: ContactDetails = {
    name: 'Playwright User',
    email: 'playwright@example.com',
    password: 'Example123!',
    company: 'QA Team',
    website: 'https://example.com',
    country: 'Australia',
    city: 'Sydney',
    addressLine1: '1 Test Street',
    addressLine2: 'Suite 2',
    state: 'NSW',
    zip: '2000',
  };

  await formPage.open();
  await formPage.fillForm(validDetails);
  await formPage.submitForm();
});
