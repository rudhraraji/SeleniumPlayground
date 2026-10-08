import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapProgressBarDialogPage extends BasePage {
  readonly url = appUrl('selenium-playground/bootstrap-progress-bar-dialog-demo/');
  readonly heading: Locator;
  readonly twoSecondDialogButton: Locator;
  readonly threeSecondDialogButton: Locator;
  readonly fiveSecondDialogButton: Locator;
  readonly dialogButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Bootstrap Progress Bar Dialog Demo',
      exact: true,
    });
    this.twoSecondDialogButton = page.getByRole('button', {
      name: 'Show dialog (Autoclose after 2 seconds)',
      exact: true,
    });
    this.threeSecondDialogButton = page.getByRole('button', {
      name: 'Show dialog (Autoclose after 3 seconds)',
      exact: true,
    });
    this.fiveSecondDialogButton = page.getByRole('button', {
      name: 'Show dialog (Autoclose after 5 seconds)',
      exact: true,
    });
    this.dialogButtons = page.getByRole('button', {
      name: /Show dialog \(Autoclose after \d seconds\)/,
    });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.dialogButtons).toHaveCount(3);
    await expect(this.twoSecondDialogButton).toBeVisible();
    await expect(this.threeSecondDialogButton).toBeVisible();
    await expect(this.fiveSecondDialogButton).toBeVisible();
    await expect(this.twoSecondDialogButton).toBeEnabled();
    await expect(this.threeSecondDialogButton).toBeEnabled();
    await expect(this.fiveSecondDialogButton).toBeEnabled();
  }
}
