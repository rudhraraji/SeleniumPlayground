import { expect, test } from '@playwright/test';
import DataListFilterPage from '../pages/DataListFilterPage';

test('Data List Filter Demo › filters attendees by search text', async ({ page }) => {
  const dataListFilterPage = new DataListFilterPage(page);
  await dataListFilterPage.open();

  await expect(dataListFilterPage.attendeeNames).toHaveCount(6);
  await dataListFilterPage.searchInput.pressSequentially('Jonathan', { delay: 50 });
  await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Jonathan Oakes' })).toBeVisible();
  await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Catherine Pearce' })).toBeHidden();
});
