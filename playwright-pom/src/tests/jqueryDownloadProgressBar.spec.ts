import { expect, test } from '../fixtures/test';
import JqueryDownloadProgressBarPage from '../pages/JqueryDownloadProgressBarPage';

test('JQuery Download Progress-Bar Demo › shows the download progress dialog', async ({ page }) => {
  const downloadPage = new JqueryDownloadProgressBarPage(page);
  await downloadPage.open();

  await downloadPage.startDownloadButton.click();
  await expect(downloadPage.progressDialog).toBeVisible();
  await expect(downloadPage.dialogTitle).toHaveText('File Download');
  await expect(downloadPage.downloadStatus).toContainText('Starting download...');
});
