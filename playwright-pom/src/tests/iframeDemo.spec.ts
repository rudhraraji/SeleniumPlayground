import { test } from '../fixtures/test';
import IframeDemoPage from '../pages/IframeDemoPage';

test('iFrame Demo › edits content inside the rich text editor iframe', async ({ page }) => {
  const iframePage = new IframeDemoPage(page);
  await iframePage.open();

  await iframePage.assertEditorContains('Your content.');
  await iframePage.assertSecondFrameVisible();
  await iframePage.boldButton.waitFor({ state: 'visible' });
  await iframePage.editEditor('Edited in the iframe');
  await iframePage.assertEditorText('Edited in the iframe');
});
