import { expect, test } from '@playwright/test';
import UploadFilePage from '../pages/UploadFilePage';

test.describe('Upload File Demo', () => {
  test('accepts a selected file', async ({ page }) => {
    const uploadPage = new UploadFilePage(page);
    await uploadPage.open();

    await page.evaluate(() => {
      document.addEventListener(
        'change',
        event => {
          const input = event.target;
          if (input instanceof HTMLInputElement && input.type === 'file') {
            document.body.dataset.selectedFileName =
              input.files?.[0]?.name ?? '';
          }
        },
        { once: true, capture: true }
      );
    });

    await uploadPage.fileInput.setInputFiles({
      name: 'playwright-upload.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Playwright upload test'),
    });

    await expect(page.locator('body')).toHaveAttribute(
      'data-selected-file-name',
      'playwright-upload.txt'
    );
  });
});
