import { expect, test } from '../fixtures/test';
import JqueryDualListBoxPage from '../pages/JqueryDualListBoxPage';

test('JQuery Dual List Box Demo › moves a selected item between lists', async ({ page }) => {
  const listBoxPage = new JqueryDualListBoxPage(page);
  await listBoxPage.open();

  await listBoxPage.availableItems.selectOption({ label: 'Andrea' });
  await listBoxPage.addButton.click();
  await expect(listBoxPage.availableItems.locator('option', { hasText: 'Andrea' })).toHaveCount(0);
  await expect(listBoxPage.selectedItems.locator('option', { hasText: 'Andrea' })).toHaveCount(1);

  await listBoxPage.selectedItems.selectOption({ label: 'Andrea' });
  await listBoxPage.removeButton.click();
  await expect(listBoxPage.availableItems.locator('option', { hasText: 'Andrea' })).toHaveCount(1);
});
