import { expect, test } from '../fixtures/test';
import DragDropRangeSlidersPage from '../pages/DragDropRangeSlidersPage';

test.describe('Drag & Drop Range Sliders', () => {
  let slidersPage: DragDropRangeSlidersPage;

  test.beforeEach(async ({ page }) => {
    slidersPage = new DragDropRangeSlidersPage(page);
    await slidersPage.open();
  });

  test('opens the slider demo with all sliders in their default positions', async ({ page }) => {
    await expect(page).toHaveURL(/\/selenium-playground\/drag-drop-range-sliders-demo\/?$/);
    await expect(slidersPage.heading).toBeVisible();
    await expect(slidersPage.sliders).toHaveCount(8);
    for (const [index, value] of ['5', '20', '15', '50', '25', '30', '40', '80'].entries()) {
      await expect(slidersPage.sliders.nth(index)).toHaveValue(value);
    }
  });

  test('updates a slider and its displayed value when moved in either direction', async () => {
    const slider = slidersPage.sliders.nth(0);
    const output = slider.locator('xpath=..').locator('output');

    await slidersPage.setSliderValue(0, 42);
    await expect(slider).toHaveValue('42');
    await expect(output).toHaveText('42');

    await slidersPage.setSliderValue(0, 18);
    await expect(slider).toHaveValue('18');
    await expect(output).toHaveText('18');
  });

  test('allows values at the slider minimum and maximum', async () => {
    const slider = slidersPage.sliders.nth(0);
    const output = slider.locator('xpath=..').locator('output');

    await slidersPage.setSliderValue(0, 1);
    await expect(output).toHaveText('1');

    await slidersPage.setSliderValue(0, 100);
    await expect(output).toHaveText('100');
  });

  test('rejects values outside the slider range', async () => {
    await expect(slidersPage.setSliderValue(0, 101)).rejects.toThrow(
      'Slider value 101 is outside the supported range 1-100',
    );
    await expect(slidersPage.sliders.nth(0)).toHaveValue('5');
  });
});
