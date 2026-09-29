import { expect, test } from '@playwright/test';
import BootstrapDownloadProgressPage from '../pages/BootstrapDownloadProgressPage';

test('Bootstrap Download Progress Demo › starts at zero with an empty status', async ({ page }) => {
  const progressPage = new BootstrapDownloadProgressPage(page);
  await progressPage.open();

  await expect(progressPage.progressCounter).toHaveText('0%');
  await expect(progressPage.successMessage).toBeEmpty();
  await expect(progressPage.startDownloadButton).toBeEnabled();
});

test('Bootstrap Download Progress Demo › completes the download successfully', async ({ page }) => {
  const progressPage = new BootstrapDownloadProgressPage(page);
  await progressPage.open();

  await progressPage.startDownloadButton.click();
  await expect(progressPage.progressCounter).toHaveText('100%', { timeout: 20000 });
  await expect(progressPage.progressBar).toHaveAttribute('style', /width:\s*100%/);
  await expect(progressPage.successMessage).toHaveText('Download completed!');
});
