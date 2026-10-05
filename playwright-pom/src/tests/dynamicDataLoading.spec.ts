import { expect, test } from '../fixtures/test';
import DynamicDataLoadingPage from '../pages/DynamicDataLoadingPage';

test.describe('Dynamic Data Loading Demo', () => {
  let dynamicDataPage: DynamicDataLoadingPage;

  test.beforeEach(async ({ page }) => {
    dynamicDataPage = new DynamicDataLoadingPage(page);
    await dynamicDataPage.open();
  });

  test('opens with the user details area empty', async ({ page }) => {
    await expect(page).toHaveURL(/\/selenium-playground\/dynamic-data-loading-demo\/?$/);
    await expect(dynamicDataPage.heading).toBeVisible();
    await expect(dynamicDataPage.loadUserButton).toHaveText('Get Random User');
    await expect(dynamicDataPage.userDetails).toBeEmpty();
  });

  test('loads a user name and profile image when requested', async () => {
    await dynamicDataPage.loadUserButton.click();

    await expect(dynamicDataPage.userDetails).toContainText('First Name :', { timeout: 15000 });
    await expect(dynamicDataPage.userDetails).toContainText('Last Name :');
    await expect(dynamicDataPage.userImage).toHaveAttribute('src', /randomuser\.me\/api\/portraits\//);
    await expect(dynamicDataPage.userImage).toHaveJSProperty('complete', true);
    expect(await dynamicDataPage.userImage.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  });

  test('loads another user when requested again', async () => {
    await dynamicDataPage.loadUserButton.click();
    await expect(dynamicDataPage.userDetails).toContainText('Last Name :', { timeout: 15000 });
    const firstUser = await dynamicDataPage.userDetails.innerText();

    await dynamicDataPage.loadUserButton.click();
    await expect(dynamicDataPage.userDetails).not.toHaveText(firstUser, { timeout: 15000 });
    await expect(dynamicDataPage.userDetails).toContainText('First Name :');
    await expect(dynamicDataPage.userDetails).toContainText('Last Name :');
  });
});
