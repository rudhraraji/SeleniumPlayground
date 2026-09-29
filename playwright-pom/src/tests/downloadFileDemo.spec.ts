import { expect, test } from '@playwright/test';
import DownloadFileDemoPage from '../pages/DownloadFileDemoPage';

test('Download File Demo › provides the PDF download link', async ({ page }) => {
  const downloadPage = new DownloadFileDemoPage(page);
  await downloadPage.open();

  await expect(downloadPage.pdfDownloadLink).toBeVisible();
  await expect(downloadPage.pdfDownloadLink).toHaveAttribute('href', /LambdaTest\.pdf$/);
});
