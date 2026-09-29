import { expect, test } from '@playwright/test';
import ContextMenuPage from '../pages/ContextMenuPage';

test('Context Menu Demo › shows a right-click target', async ({ page }) => {
  const contextMenuPage = new ContextMenuPage(page);
  await contextMenuPage.open();

  await expect(contextMenuPage.instructions).toBeVisible();
  await expect(contextMenuPage.contextMenuTarget).toHaveText('Right-click here');
  await contextMenuPage.contextMenuTarget.click({ button: 'right' });
  await expect(contextMenuPage.contextMenuTarget).toBeVisible();
});
