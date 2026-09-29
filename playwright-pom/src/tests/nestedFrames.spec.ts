import { expect, test } from '@playwright/test';
import NestedFramesPage from '../pages/NestedFramesPage';

test('Nested Frames Demo › renders the top frame and its nested frames', async ({ page }) => {
  const framesPage = new NestedFramesPage(page);
  await framesPage.open();

  await expect(framesPage.topFrameContent).toContainText('Top');
  await expect(framesPage.leftFrameContent).toContainText('Left');
  await expect(framesPage.middleFrameContent).toContainText('Middle');
  await expect(framesPage.rightFrameContent).toContainText('Right');
});
