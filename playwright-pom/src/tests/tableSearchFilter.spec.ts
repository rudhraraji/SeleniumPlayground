import { expect, test } from '../fixtures/test';
import TableSearchFilterPage from '../pages/TableSearchFilterPage';

test.describe('Table Search Filter Demo', () => {
  let tablePage: TableSearchFilterPage;

  test.beforeEach(async ({ page }) => {
    tablePage = new TableSearchFilterPage(page);
    await tablePage.open();
  });

  test('displays the task filter and initial task table data', async () => {
    await expect(tablePage.taskRows).toHaveCount(7);
    await expect(tablePage.taskRows.nth(0)).toContainText('Development');
    await expect(tablePage.taskRows.nth(3)).toContainText('JavaScript');
  });

  test('accepts filter text and can be cleared', async () => {
    await tablePage.filterTasks('JavaScript');
    await expect(tablePage.taskFilter).toHaveValue('JavaScript');

    await tablePage.clearTaskFilter();
    await expect(tablePage.taskFilter).toHaveValue('');
  });
});
