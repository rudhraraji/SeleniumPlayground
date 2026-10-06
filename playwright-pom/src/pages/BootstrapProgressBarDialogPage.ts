import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapProgressBarDialogPage extends BasePage {
  readonly url = appUrl('selenium-playground/bootstrap-progress-bar-dialog-demo/');
  readonly heading: Locator;
  readonly twoSecondDialogButton: Locator;
  readonly dialogButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Bootstrap Progress Bar Dialog Demo',
      exact: true,
    });
    this.twoSecondDialogButton = page.getByRole('button', {
      name: 'Show dialog (Autoclose after 2 seconds)',
    });
    this.dialogButtons = page.getByRole('button', {
      name: /Show dialog \(Autoclose after \d seconds\)/,
    });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
