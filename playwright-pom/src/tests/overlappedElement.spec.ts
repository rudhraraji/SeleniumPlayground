import { expect, test } from '@playwright/test';
import OverlappedElementPage from '../pages/OverlappedElementPage';

test('Overlapped Element Demo › accepts values in each form field', async ({ page }) => {
  const overlappedPage = new OverlappedElementPage(page);
  await overlappedPage.open();

  await overlappedPage.idInput.fill('42');
  await overlappedPage.scrollFieldsToBottom();
  await overlappedPage.nameInput.fill('Playwright User');
  await overlappedPage.subjectInput.fill('Form interaction');
  await expect(overlappedPage.idInput).toHaveValue('42');
  await expect(overlappedPage.nameInput).toHaveValue('Playwright User');
  await expect(overlappedPage.subjectInput).toHaveValue('Form interaction');
});
