import { expect, test } from '../fixtures/test';
import ContextMenuPage from '../pages/ContextMenuPage';

test.describe('Context Menu Demo', () => {
  let contextMenuPage: ContextMenuPage;

  test.beforeEach(async ({ page }) => {
    contextMenuPage = new ContextMenuPage(page);
    await contextMenuPage.open();
  });

  test('opens the context menu demo page', async ({ page }) => {
    await expect(page).toHaveURL(/\/selenium-playground\/context-menu\/?$/);
    await expect(contextMenuPage.heading).toBeVisible();
    await expect(contextMenuPage.instructions).toBeVisible();
  });

  test('shows the right-click target', async () => {
    await expect(contextMenuPage.contextMenuTarget).toBeVisible();
    await expect(contextMenuPage.contextMenuTarget).toHaveText('Right-click here');
  });

  test('shows the expected alert when the target is right-clicked', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');
    const rightClickPromise = contextMenuPage.contextMenuTarget.click({ button: 'right' });
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('You selected a context menu');
    await dialog.accept();
    await rightClickPromise;
  });
});
