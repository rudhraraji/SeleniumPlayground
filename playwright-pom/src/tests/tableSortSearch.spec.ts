import { expect, test } from '@playwright/test';
import TableSortSearchPage from '../pages/TableSortSearchPage';

test('Table Sorting And Searching Demo › searches and sorts table records', async ({ page }) => {
  const tablePage = new TableSortSearchPage(page);
  await tablePage.open();

  await expect(tablePage.visibleRows).toHaveCount(10);
  await tablePage.searchInput.fill('A. Bennett');
  await expect(tablePage.visibleRows).toHaveCount(1);
  await expect(tablePage.visibleRows.first()).toContainText('A. Bennett');
  await tablePage.searchInput.clear();
  await tablePage.nameHeader.click();
  await expect(tablePage.visibleRows.first()).not.toContainText('A. Bennett');
});
