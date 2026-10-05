import { expect, test } from '../fixtures/test';
import BootstrapModalPage from '../pages/BootstrapModalPage';

test.describe('Bootstrap Modal Demo', () => {
  test.beforeEach(async ({ page }) => {
    const modalPage = new BootstrapModalPage(page);
    await modalPage.open();
  });

  test('provides a configured single-modal launch control', async ({ page }) => {
    const modalPage = new BootstrapModalPage(page);

    await expect(modalPage.launchButtons).toHaveCount(3);
    await expect(modalPage.launchButtons.nth(0)).toHaveAttribute(
      'data-target',
      '#myModal'
    );
    await expect(modalPage.singleModal).toContainText('Modal Title');
  });

  test('provides a configured multiple-modal launch control', async ({ page }) => {
    const modalPage = new BootstrapModalPage(page);

    await expect(modalPage.launchButtons.nth(1)).toHaveAttribute(
      'data-target',
      '#myMultiModal'
    );
    await expect(modalPage.multipleModal).toContainText('First Modal');
  });

  test('configures the single modal close and save controls', async ({ page }) => {
    const modalPage = new BootstrapModalPage(page);

    await expect(modalPage.singleModal).toBeHidden();
    await expect(modalPage.singleModal).toContainText('This is the place where the content for the modal dialog displays');
    await expect(modalPage.singleModalDismissButtons).toHaveCount(3);
    await expect(modalPage.singleModal.locator('button').filter({ hasText: 'Close' }))
      .toHaveAttribute('data-dismiss', 'modal');
    await expect(modalPage.singleModal.locator('button').filter({ hasText: 'Save Changes' }))
      .toHaveAttribute('data-dismiss', 'modal');
  });

  test('configures the nested modal launch and dismiss controls', async ({ page }) => {
    const modalPage = new BootstrapModalPage(page);

    await expect(modalPage.multipleModal).toBeHidden();
    await expect(modalPage.secondModal).toContainText('Modal 2');
    await expect(modalPage.nestedModalLaunchButton).toHaveAttribute('data-target', '#mySecondModal');
    await expect(modalPage.nestedModalDismissButtons).toHaveCount(3);
  });
});
