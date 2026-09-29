import { expect, test } from '@playwright/test';
import VirtualDomPage from '../pages/VirtualDomPage';

test('Virtual DOM Demo › displays live clock readouts', async ({ page }) => {
  const virtualDomPage = new VirtualDomPage(page);
  await virtualDomPage.open();

  await expect(virtualDomPage.timeReadouts).toHaveCount(3);
  await expect(virtualDomPage.timeReadouts.first()).toContainText(/Current Time:/);
});
