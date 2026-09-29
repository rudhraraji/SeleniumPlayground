import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class CheckboxPage extends BasePage {
  readonly url = appUrl('selenium-playground/checkbox-demo/');
  readonly heading: Locator;
  readonly singleCheckbox: Locator;
  readonly disabledOptions: Locator;
  readonly multipleOptions: Locator;
  readonly checkAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Checkbox Demo',
      exact: true,
    });
    this.singleCheckbox = page.getByRole('checkbox', {
      name: 'Click on check box',
    });
    this.disabledOptions = page.locator('input[type="checkbox"]:disabled');
    this.multipleOptions = page.locator('input[name^="option"]');
    this.checkAllButton = page.getByRole('button', { name: 'Check All', exact: true });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
