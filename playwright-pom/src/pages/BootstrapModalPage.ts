import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapModalPage extends BasePage {
  readonly url = appUrl('selenium-playground/bootstrap-modal-demo/');
  readonly heading: Locator;
  readonly launchButtons: Locator;
  readonly singleModal: Locator;
  readonly multipleModal: Locator;
  readonly secondModal: Locator;
  readonly singleModalDismissButtons: Locator;
  readonly nestedModalLaunchButton: Locator;
  readonly nestedModalDismissButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Bootstrap Modal', exact: true });
    this.launchButtons = page.locator('main button[data-toggle="modal"]');
    this.singleModal = page.locator('#myModal');
    this.multipleModal = page.locator('#myMultiModal');
    this.secondModal = page.locator('#mySecondModal');
    this.singleModalDismissButtons = this.singleModal.locator('[data-dismiss="modal"]');
    this.nestedModalLaunchButton = this.multipleModal.locator('button[data-target="#mySecondModal"]');
    this.nestedModalDismissButtons = this.multipleModal.locator('[data-dismiss="modal"]');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
