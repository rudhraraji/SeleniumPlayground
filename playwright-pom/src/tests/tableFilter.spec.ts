import { expect, test } from '@playwright/test';
import TableFilterPage from '../pages/TableFilterPage';

test('Table Filter Demo › filters records and restores all rows', async ({ page }) => {
  const tableFilterPage = new TableFilterPage(page);
  await tableFilterPage.open();

  await expect(tableFilterPage.tableRows).toHaveCount(5);
  await page.getByRole('button', { name: 'Selenium Testing', exact: true }).click();
  await expect(tableFilterPage.visibleTableRows).toHaveCount(2);
  await expect(tableFilterPage.visibleTableRows).toContainText(['Selenium Testing', 'Selenium Testing']);

  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(tableFilterPage.visibleTableRows).toHaveCount(5);
});
