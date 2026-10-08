import { expect, test } from '../fixtures/test';
import KeyPressPage from '../pages/KeyPressPage';

test.describe('Key Press Demo', () => {
  let keyPressPage: KeyPressPage;

  test.beforeEach(async ({ page }) => {
    keyPressPage = new KeyPressPage(page);
    await keyPressPage.open();
  });

  test('reports a printable key', async () => {
    await keyPressPage.pressKey('A');
    await expect(keyPressPage.keyResult).toBeVisible();
    await expect(keyPressPage.keyResult).toHaveText('You entered: A');
  });

  test('reports a special key', async () => {
    await keyPressPage.pressKey('Enter');
    await expect(keyPressPage.keyResult).toBeVisible();
    await expect(keyPressPage.keyResult).toHaveText('You entered: ENTER');
  });
});
