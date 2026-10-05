import { expect, test } from '../fixtures/test';
import DataListFilterPage from '../pages/DataListFilterPage';

test.describe('Data List Filter Demo', () => {
  let dataListFilterPage: DataListFilterPage;

  test.beforeEach(async ({ page }) => {
    dataListFilterPage = new DataListFilterPage(page);
    await dataListFilterPage.open();
  });

  test('shows the search field and all attendee cards initially', async () => {
    await expect(dataListFilterPage.searchInput).toBeVisible();
    await expect(dataListFilterPage.searchInput).toHaveAttribute('placeholder', 'Search Attendees...');
    await expect(dataListFilterPage.attendeeNames).toHaveCount(6);
    await expect(dataListFilterPage.attendeeCards).toHaveCount(6);
  });

  test('filters attendees by a matching name', async () => {
    await dataListFilterPage.searchInput.pressSequentially('Jonathan', { delay: 50 });

    await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Jonathan Oakes' })).toBeVisible();
    await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Catherine Pearce' })).toBeHidden();
    await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Dwayne Portland' })).toBeHidden();
  });

  test('matches search text without regard to letter case', async () => {
    await dataListFilterPage.searchInput.pressSequentially('diana', { delay: 50 });

    await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Diana Bradshaw' })).toBeVisible();
    await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Jonathan Oakes' })).toBeHidden();
  });

  test('shows no cards for a query with no matches and restores them when cleared', async () => {
    await dataListFilterPage.searchInput.pressSequentially('no-match', { delay: 50 });
    await expect(dataListFilterPage.attendeeCards.filter({ visible: true })).toHaveCount(0);

    await dataListFilterPage.searchInput.fill('');
    await expect(dataListFilterPage.attendeeCards).toHaveCount(6);
    await expect(dataListFilterPage.attendeeCards.filter({ hasText: 'Jonathan Oakes' })).toBeVisible();
  });
});
