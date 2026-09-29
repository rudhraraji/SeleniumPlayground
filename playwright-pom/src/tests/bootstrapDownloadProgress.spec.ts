import { expect, test } from '@playwright/test';
import BootstrapDownloadProgressPage from '../pages/BootstrapDownloadProgressPage';

test('Bootstrap Download Progress Demo › completes the progress bar', async ({ page }) => {
  const progressPage = new BootstrapDownloadProgressPage(page);
  await progressPage.open();

  await progressPage.startDownloadButton.click();
  await expect(progressPage.progressCounter).toHaveText('100%', { timeout: 20000 });
  await expect(progressPage.progressBar).toHaveAttribute('style', /width:\s*100%/);
  await expect(progressPage.successMessage).not.toBeEmpty();
});
