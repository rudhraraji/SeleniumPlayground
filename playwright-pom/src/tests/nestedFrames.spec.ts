import { expect, test } from '../fixtures/test';
import NestedFramesPage from '../pages/NestedFramesPage';

test.describe('Nested Frames Demo', () => {
  test('loads the page with top and bottom frames', async ({ page }) => {
    const framesPage = new NestedFramesPage(page);
    await framesPage.open();

    await expect(page).toHaveURL(framesPage.url);
    await expect(framesPage.topFrameContent).toContainText('Top');
    await expect(framesPage.bottomFrameElement).toBeVisible();
  });

  test('renders the left, middle, and right nested frames', async ({ page }) => {
    const framesPage = new NestedFramesPage(page);
    await framesPage.open();

    await expect(framesPage.leftFrameContent).toContainText('Left');
    await expect(framesPage.middleFrameContent).toContainText('Middle');
    await expect(framesPage.rightFrameContent).toContainText('Right');
  });
});
