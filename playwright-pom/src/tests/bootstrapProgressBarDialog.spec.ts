import { expect, test } from '@playwright/test';
import BootstrapProgressBarDialogPage from '../pages/BootstrapProgressBarDialogPage';

test.describe('Bootstrap Progress Bar Dialog Demo', () => {
  test('shows all three timed-dialog controls', async ({ page }) => {
    const dialogPage = new BootstrapProgressBarDialogPage(page);
    await dialogPage.open();

    await expect(dialogPage.dialogButtons).toHaveCount(3);
    await expect(dialogPage.twoSecondDialogButton).toBeVisible();
    await expect(dialogPage.dialogButtons.nth(1)).toHaveText(
      'Show dialog (Autoclose after 3 seconds)'
    );
    await expect(dialogPage.dialogButtons.nth(2)).toHaveText(
      'Show dialog (Autoclose after 5 seconds)'
    );
  });
});
