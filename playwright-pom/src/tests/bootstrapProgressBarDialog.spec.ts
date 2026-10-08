import { expect, test } from '../fixtures/test';
import BootstrapProgressBarDialogPage from '../pages/BootstrapProgressBarDialogPage';

test.describe('Bootstrap Progress Bar Dialog Demo', () => {
  test('shows all three timed-dialog controls', async ({ page }) => {
    const dialogPage = new BootstrapProgressBarDialogPage(page);
    await dialogPage.open();

    await expect(dialogPage.twoSecondDialogButton).toHaveText(
      'Show dialog (Autoclose after 2 seconds)',
    );
    await expect(dialogPage.threeSecondDialogButton).toHaveText(
      'Show dialog (Autoclose after 3 seconds)',
    );
    await expect(dialogPage.fiveSecondDialogButton).toHaveText(
      'Show dialog (Autoclose after 5 seconds)',
    );
  });
});
