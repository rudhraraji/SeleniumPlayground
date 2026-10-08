import { expect, test } from '../fixtures/test';
import TableFilterPage from '../pages/TableFilterPage';

test.describe('Table Filter Demo', () => {
  let tableFilterPage: TableFilterPage;

  test.beforeEach(async ({ page }) => {
    tableFilterPage = new TableFilterPage(page);
    await tableFilterPage.open();
  });

  test('shows the full table and its filter controls', async () => {
    await expect(tableFilterPage.visibleTableRows).toHaveCount(5);
    await expect(tableFilterPage.filterButtons).toHaveCount(4);
    await expect(tableFilterPage.allFilterButton).toBeVisible();
  });

  test('filters records by category and restores all rows', async () => {
    await tableFilterPage.filterBy('Selenium Testing');
    await expect(tableFilterPage.visibleTableRows).toHaveCount(2);
    await expect(tableFilterPage.visibleTableRows).toContainText([
      'Selenium Testing',
      'Selenium Testing',
    ]);

    await tableFilterPage.showAllRecords();
    await expect(tableFilterPage.visibleTableRows).toHaveCount(5);
  });
});
