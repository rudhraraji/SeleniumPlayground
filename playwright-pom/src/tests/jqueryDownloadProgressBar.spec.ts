import { expect, test } from '../fixtures/test';
import JqueryDownloadProgressBarPage from '../pages/JqueryDownloadProgressBarPage';

test.describe('JQuery Download Progress-Bar Demo', () => {
  test('shows the download progress dialog and starting status', async ({ page }) => {
    const downloadPage = new JqueryDownloadProgressBarPage(page);
    await downloadPage.open();
    await expect(downloadPage.progressDialog).toBeHidden();

    await downloadPage.startDownload();
    await expect(downloadPage.progressDialog).toBeVisible();
    await expect(downloadPage.downloadStatus).toContainText('Starting download...');
    await expect(downloadPage.progressBar).toBeVisible();
  });
});
