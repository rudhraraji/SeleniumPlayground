import { expect, test } from '@playwright/test';
import TablePaginationPage from '../pages/TablePaginationPage';

test('Table Pagination Demo › changes the number of visible records', async ({ page }) => {
  const paginationPage = new TablePaginationPage(page);
  await paginationPage.open();

  await expect(paginationPage.tableHeaders).toHaveText(['ID', 'First Name', 'Last Name', 'Email', 'Phone']);
  await expect(paginationPage.visibleRows).toHaveCount(5);
  await paginationPage.rowsPerPageSelect.selectOption('10');
  await expect(paginationPage.visibleRows).toHaveCount(10);
});
