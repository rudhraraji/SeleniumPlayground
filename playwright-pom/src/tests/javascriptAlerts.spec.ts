import { expect, test } from '@playwright/test';
import JavascriptAlertsPage from '../pages/JavascriptAlertsPage';

test.describe('JavaScript Alert Box Demo', () => {
  let alertsPage: JavascriptAlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.open();
  });

  test('shows the alert message', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = alertsPage.alertButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am an alert box!');
    await dialog.accept();
    await clickPromise;
  });

  test('displays the confirmation result when accepted', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = alertsPage.confirmButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Press a button!');
    await dialog.accept();
    await clickPromise;
    await expect(alertsPage.result).toHaveText('You pressed OK!');
  });

  test('displays the entered prompt value', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = alertsPage.promptButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('Please enter your name');
    await dialog.accept('Playwright test');
    await clickPromise;
    await expect(alertsPage.result).toHaveText("You have entered 'Playwright test' !");
  });
});
