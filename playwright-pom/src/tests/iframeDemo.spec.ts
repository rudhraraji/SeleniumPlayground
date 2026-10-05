import { expect, test } from '../fixtures/test';
import IframeDemoPage from '../pages/IframeDemoPage';

test('iFrame Demo › edits content inside the rich text editor iframe', async ({ page }) => {
  const iframePage = new IframeDemoPage(page);
  await iframePage.open();

  await expect(iframePage.editor).toHaveText('Your content.');
  await expect(iframePage.boldButton).toBeVisible();
  await iframePage.editor.fill('Edited in the iframe');
  await expect(iframePage.editor).toHaveText('Edited in the iframe');
});
