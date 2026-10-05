import { expect, test } from '../fixtures/test';
import DownloadFileDemoPage from '../pages/DownloadFileDemoPage';

test.describe('Download File Demo', () => {
  let downloadPage: DownloadFileDemoPage;

  test.beforeEach(async ({ page }) => {
    downloadPage = new DownloadFileDemoPage(page);
    await downloadPage.open();
  });

  test('opens the download demo page', async ({ page }) => {
    await expect(page).toHaveURL(/\/selenium-playground\/download-file-demo\/?$/);
    await expect(downloadPage.heading).toBeVisible();
  });

  test('provides a link to the LambdaTest PDF', async () => {
    await expect(downloadPage.pdfDownloadLink).toBeVisible();
    await expect(downloadPage.pdfDownloadLink).toHaveText('Download File');
    await expect(downloadPage.pdfDownloadLink).toHaveAttribute('href', /LambdaTest\.pdf$/);
  });

  test('downloads the PDF with the expected filename', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await downloadPage.pdfDownloadLink.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('LambdaTest.pdf');
  });
});
