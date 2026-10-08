import { expect, test } from '../fixtures/test';
import SimpleFormPage from '../pages/SimpleFormPage';

test.describe('Simple Form Demo', () => {
  let simpleFormPage: SimpleFormPage;

  test.beforeEach(async ({ page }) => {
    simpleFormPage = new SimpleFormPage(page);
    await simpleFormPage.open();
  });

  test('echoes a submitted message', async () => {
    const message = 'Playwright message';
    await simpleFormPage.echoMessage(message);
    await expect(simpleFormPage.messageResult).toHaveText(message);
  });

  test('calculates the sum of two numbers', async () => {
    await simpleFormPage.calculateSum(10, 20);
    await expect(simpleFormPage.sumResult).toHaveText('30');
  });
});
