import { expect, test } from '../fixtures/test';
import GeolocationPage from '../pages/GeolocationPage';

test.describe('Geolocation Testing', () => {
  test('shows the geolocation field labels', async ({ page }) => {
    const geolocationPage = new GeolocationPage(page);
    await geolocationPage.open();

    await expect(geolocationPage.fields).toHaveCount(5);
    await expect(geolocationPage.fields.nth(0)).toContainText('IP Address:');
    await expect(geolocationPage.fields.nth(1)).toContainText('Country Name:');
    await expect(geolocationPage.fields.nth(2)).toContainText('Country Code:');
    await expect(geolocationPage.fields.nth(3)).toContainText('Latitude:');
    await expect(geolocationPage.fields.nth(4)).toContainText('longitude:');
  });
});
