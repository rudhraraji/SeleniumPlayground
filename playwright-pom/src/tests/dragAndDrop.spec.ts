import { expect, test } from '../fixtures/test';
import DragAndDropPage from '../pages/DragAndDropPage';

test.describe('Drag and Drop Demo', () => {
  let dragAndDropPage: DragAndDropPage;

  test.beforeEach(async ({ page }) => {
    dragAndDropPage = new DragAndDropPage(page);
    await dragAndDropPage.open();
  });

  test('opens the demo with draggable items, a drop zone, and reset control', async ({ page }) => {
    await expect(page).toHaveURL(/\/selenium-playground\/drag-and-drop-demo\/?$/);
    await expect(dragAndDropPage.heading).toBeVisible();
    await expect(dragAndDropPage.draggableItems).toHaveText(['Draggable 1', 'Draggable 2']);
    await expect(dragAndDropPage.dropTarget).toBeVisible();
    await expect(dragAndDropPage.resetButton).toBeVisible();
  });

  test('moves a dragged item to the dropped items list', async () => {
    await dragAndDropPage.draggableItems.first().dragTo(dragAndDropPage.dropTarget, { steps: 10 });

    await expect(dragAndDropPage.droppedItems).toHaveText('Draggable 1');
    await expect(dragAndDropPage.draggableItems).toHaveCount(1);
    await expect(dragAndDropPage.draggableItems).toHaveText('Draggable 2');
  });

  test('reset restores draggable items and clears the dropped items list', async () => {
    await dragAndDropPage.draggableItems.first().dragTo(dragAndDropPage.dropTarget, { steps: 10 });
    await expect(dragAndDropPage.droppedItems).toHaveText('Draggable 1');

    await dragAndDropPage.resetButton.click();

    await expect(dragAndDropPage.draggableItems).toHaveText(['Draggable 1', 'Draggable 2']);
    await expect(dragAndDropPage.droppedItems).toBeEmpty();
  });
});
