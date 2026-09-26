import { expect, test } from '@playwright/test';
import DragDropRangeSlidersPage from '../pages/DragDropRangeSlidersPage';

test.describe('Drag & Drop Range Sliders', () => {
  test('updates a slider and its displayed value', async ({ page }) => {
    const slidersPage = new DragDropRangeSlidersPage(page);
    await slidersPage.open();

    await expect(slidersPage.sliders).toHaveCount(8);
    await slidersPage.setSliderValue(0, 42);
  });
});
