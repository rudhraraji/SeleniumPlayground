import { expect, test } from '../fixtures/test';
import StatusCodePage from '../pages/StatusCodePage';

test('Status Codes Demo › explains the standard response codes', async ({ page }) => {
  const statusCodePage = new StatusCodePage(page);
  await statusCodePage.open();

  await expect(statusCodePage.statusCodes).toHaveText(['200', '301', '404', '500']);
  await expect(statusCodePage.statusDescriptions).toHaveCount(4);
  await expect(statusCodePage.statusDescriptions.nth(0)).toContainText('request has succeeded');
  await expect(statusCodePage.statusDescriptions.nth(2)).toContainText('page is not available');
});
