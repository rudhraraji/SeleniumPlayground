import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapAlertMessagesPage extends BasePage {
  readonly url = appUrl('selenium-playground/bootstrap-alert-messages-demo/');
  readonly heading: Locator;
  readonly autoSuccessButton: Locator;
  readonly normalSuccessButton: Locator;
  readonly autoInfoButton: Locator;
  readonly normalInfoButton: Locator;
  readonly autoWarningButton: Locator;
  readonly normalWarningButton: Locator;
  readonly autoDangerButton: Locator;
  readonly normalDangerButton: Locator;
  readonly alerts: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Bootstrap Alert Messages', exact: true });
    this.autoSuccessButton = page.getByRole('button', { name: 'Autoclosable Success Message', exact: true });
    this.normalSuccessButton = page.getByRole('button', { name: 'Normal Success Message', exact: true });
    this.autoInfoButton = page.getByRole('button', { name: 'Autoclosable Info Message', exact: true });
    this.normalInfoButton = page.getByRole('button', { name: 'Normal Info Message', exact: true });
    this.autoWarningButton = page.getByRole('button', { name: 'Autoclosable Warning Message', exact: true });
    this.normalWarningButton = page.getByRole('button', { name: 'Normal Warning Message', exact: true });
    this.autoDangerButton = page.getByRole('button', { name: 'Autoclosable Danger Message', exact: true });
    this.normalDangerButton = page.getByRole('button', { name: 'Normal Danger Message', exact: true });
    this.alerts = page.locator('.alert');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
