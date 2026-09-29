import { expect, test } from '@playwright/test';
import SimpleFormPage from '../pages/SimpleFormPage';

test('Simple Form Demo › echoes a message and calculates a sum', async ({ page }) => {
  const simpleFormPage = new SimpleFormPage(page);
  await simpleFormPage.open();

  await simpleFormPage.messageInput.fill('Playwright message');
  await simpleFormPage.showMessageButton.click();
  await expect(simpleFormPage.messageResult).toHaveText('Playwright message');

  await simpleFormPage.firstNumberInput.fill('10');
  await simpleFormPage.secondNumberInput.fill('20');
  await simpleFormPage.sumButton.click();
  await expect(simpleFormPage.sumResult).toContainText('30');
});
