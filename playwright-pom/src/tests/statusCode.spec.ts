import { expect, test } from '../fixtures/test';
import StatusCodePage from '../pages/StatusCodePage';

test.describe('Status Codes Demo', () => {
  let statusCodePage: StatusCodePage;

  test.beforeEach(async ({ page }) => {
    statusCodePage = new StatusCodePage(page);
    await statusCodePage.open();
  });

  test('lists the standard response codes', async () => {
    await expect(statusCodePage.statusCodes).toHaveText(['200', '301', '404', '500']);
  });

  test('describes successful and not-found responses', async () => {
    await expect(statusCodePage.getStatusDescription('200')).toContainText(
      'request has succeeded',
    );
    await expect(statusCodePage.getStatusDescription('404')).toContainText(
      'page is not available',
    );
  });
});
