import { expect, test } from '@playwright/test';
import HoverPage from '../pages/HoverPage';

test('Mouse Hover Demo › applies a hover style to the demo target', async ({ page }) => {
  const hoverPage = new HoverPage(page);
  await hoverPage.open();

  await expect(hoverPage.hoverTargets).toHaveCount(3);
  const target = hoverPage.hoverTargets.first();
  const originalColor = await target.evaluate(element => getComputedStyle(element).backgroundColor);
  await target.hover();
  await expect.poll(() => target.evaluate(element => getComputedStyle(element).backgroundColor))
    .not.toBe(originalColor);
});
