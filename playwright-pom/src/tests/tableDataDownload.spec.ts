import { expect, test } from '@playwright/test';
import TableDataDownloadPage from '../pages/TableDataDownloadPage';

test('Table Data Download Demo › exports the data table as CSV', async ({ page }) => {
  const tablePage = new TableDataDownloadPage(page);
  await tablePage.open();

  await expect(tablePage.tableHeaders).toHaveText([
    'First Name',
    'Last Name',
    'Gender',
    'Age',
    'Occupation',
    'Experience',
  ]);
  await expect(tablePage.tableRows.first()).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await tablePage.csvExportButton.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.csv$/i);
});
