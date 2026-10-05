import { expect, test } from '../fixtures/test';
import TableSearchFilterPage from '../pages/TableSearchFilterPage';

test.describe('Table Search Filter Demo', () => {
  test('shows the task filter and task table data', async ({ page }) => {
    const tablePage = new TableSearchFilterPage(page);
    await tablePage.open();

    await expect(tablePage.taskFilter).toBeVisible();
    await expect(tablePage.taskRows).toHaveCount(7);
    await expect(tablePage.taskRows.nth(0)).toContainText('Development');
    await expect(tablePage.taskRows.nth(3)).toContainText('JavaScript');
  });
});
