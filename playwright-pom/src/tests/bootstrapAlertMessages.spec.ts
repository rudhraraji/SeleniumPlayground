import { expect, test } from '@playwright/test';
import BootstrapAlertMessagesPage from '../pages/BootstrapAlertMessagesPage';

test('Bootstrap Alert Messages › autoclosable success message disappears automatically', async ({ page }) => {
  const alertPage = new BootstrapAlertMessagesPage(page);
  await alertPage.open();

  const successAlert = alertPage.alerts.filter({ hasText: 'Autocloseable success message.' });
  await alertPage.autoSuccessButton.click();
  await expect(successAlert).toBeVisible();
  await expect(successAlert).toContainText('Hide in 5 seconds');
  await expect(successAlert).toBeHidden({ timeout: 8000 });
});

test('Bootstrap Alert Messages › normal success message stays visible', async ({ page }) => {
  const alertPage = new BootstrapAlertMessagesPage(page);
  await alertPage.open();

  await alertPage.normalSuccessButton.click();
  const successAlert = alertPage.alerts.filter({ hasText: 'Normal success message.' });
  await expect(successAlert).toBeVisible();
  await expect(successAlert).toContainText('To close use the close button');
});

test('Bootstrap Alert Messages › autoclosable info message disappears automatically', async ({ page }) => {
  const alertPage = new BootstrapAlertMessagesPage(page);
  await alertPage.open();

  const infoAlert = alertPage.alerts.filter({ hasText: 'Autocloseable info message.' });
  await alertPage.autoInfoButton.click();
  await expect(infoAlert).toBeVisible();
  await expect(infoAlert).toContainText('Hide in 5 seconds');
  await expect(infoAlert).toBeHidden({ timeout: 8000 });
});

test('Bootstrap Alert Messages › normal info message stays visible', async ({ page }) => {
  const alertPage = new BootstrapAlertMessagesPage(page);
  await alertPage.open();

  await alertPage.normalInfoButton.click();
  const infoAlert = alertPage.alerts.filter({ hasText: 'Normal info message.' });
  await expect(infoAlert).toBeVisible();
  await expect(infoAlert).toContainText('To close use the close button');
});
