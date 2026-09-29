import { expect, test } from '@playwright/test';
import DynamicDataLoadingPage from '../pages/DynamicDataLoadingPage';

test('Dynamic Data Loading Demo › loads a random user', async ({ page }) => {
  const dynamicDataPage = new DynamicDataLoadingPage(page);
  await dynamicDataPage.open();

  await dynamicDataPage.loadUserButton.click();
  await expect(dynamicDataPage.userDetails).toContainText('First Name :', { timeout: 15000 });
  await expect(dynamicDataPage.userDetails).toContainText('Last Name :');
  await expect(dynamicDataPage.userImage).toHaveAttribute('src', /randomuser\.me/);
});
