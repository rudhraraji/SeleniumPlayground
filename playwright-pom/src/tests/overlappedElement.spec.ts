import { expect, test } from '../fixtures/test';
import OverlappedElementPage from '../pages/OverlappedElementPage';

test.describe('Overlapped Element Demo', () => {
  test('loads the form with all fields visible', async ({ page }) => {
    const overlappedPage = new OverlappedElementPage(page);
    await overlappedPage.open();

    await expect(overlappedPage.idInput).toBeVisible();
    await expect(overlappedPage.nameInput).toBeVisible();
    await expect(overlappedPage.subjectInput).toBeVisible();
  });

  test('accepts values in each field after scrolling', async ({ page }) => {
    const overlappedPage = new OverlappedElementPage(page);
    await overlappedPage.open();

    const values = {
      id: '42',
      name: 'Playwright User',
      subject: 'Form interaction',
    };
    await overlappedPage.enterFieldValues(values);

    await expect(overlappedPage.idInput).toHaveValue(values.id);
    await expect(overlappedPage.nameInput).toHaveValue(values.name);
    await expect(overlappedPage.subjectInput).toHaveValue(values.subject);
  });
});
