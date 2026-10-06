import { expect, test } from '../fixtures/test';
import JqueryDownloadProgressBarPage from '../pages/JqueryDownloadProgressBarPage';

test.describe('JQuery Download Progress-Bar Demo', () => {
  test('shows the download progress dialog and starting status', async ({ page }) => {
    const downloadPage = new JqueryDownloadProgressBarPage(page);
    await downloadPage.open();

    await downloadPage.startDownload();
    await expect(downloadPage.dialogTitle).toHaveText('File Download');
    await expect(downloadPage.downloadStatus).toContainText('Starting download...');
    await expect(downloadPage.progressBar).toBeVisible();
    await expect(downloadPage.cancelDownloadButton).toBeVisible();
    await downloadPage.cancelDownload();
  });
});
