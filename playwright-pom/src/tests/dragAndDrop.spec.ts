import { expect, test } from '@playwright/test';
import DragAndDropPage from '../pages/DragAndDropPage';

test('Drag and Drop Demo › provides draggable items and a drop target', async ({ page }) => {
  const dragAndDropPage = new DragAndDropPage(page);
  await dragAndDropPage.open();

  await expect(dragAndDropPage.draggableItems).toHaveCount(2);
  await expect(dragAndDropPage.dropTarget).toBeVisible();
  await dragAndDropPage.draggableItems.first().dragTo(dragAndDropPage.dropTarget);
  await expect(page.getByText('Draggable 1', { exact: true })).toBeVisible();
});
