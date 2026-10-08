import { expect, test } from '../fixtures/test';
import TableDataDownloadPage from '../pages/TableDataDownloadPage';

test.describe('Table Data Download Demo', () => {
  let tablePage: TableDataDownloadPage;

  test.beforeEach(async ({ page }) => {
    tablePage = new TableDataDownloadPage(page);
    await tablePage.open();
  });

  test('displays the table with the expected columns', async () => {
    await expect(tablePage.tableHeaders).toHaveText([
      'First Name',
      'Last Name',
      'Gender',
      'Age',
      'Occupation',
      'Experience',
    ]);
  });

  test('filters the table by search text', async () => {
    await tablePage.searchRows('Abraham');
    await expect(tablePage.tableRows).toHaveCount(1);
    await expect(tablePage.tableRows.first()).toContainText('Abraham');
    await expect(tablePage.tableRows.first()).toContainText('Ferguson');
  });

  test('exports the table as a CSV download', async () => {
    const filename = await tablePage.exportCsv();
    expect(filename).toMatch(/\.csv$/i);
  });
});
