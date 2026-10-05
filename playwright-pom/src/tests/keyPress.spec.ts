import { expect, test } from '../fixtures/test';
import KeyPressPage from '../pages/KeyPressPage';

test('Key Press Demo › reports the key entered', async ({ page }) => {
  const keyPressPage = new KeyPressPage(page);
  await keyPressPage.open();

  await keyPressPage.keyInput.press('A');
  await expect(keyPressPage.keyResult).toContainText('A');
});
