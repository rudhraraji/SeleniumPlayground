import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class SelectDropdownDemoPage extends BasePage {
  readonly url = appUrl('selenium-playground/select-dropdown-demo/');
  readonly heading: Locator;
  readonly daySelect: Locator;
  readonly multiSelect: Locator;
  readonly firstSelectedButton: Locator;
  readonly lastSelectedButton: Locator;
  readonly firstSelectionResult: Locator;
  readonly lastSelectionResult: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dropdown Demo', exact: true });
    this.daySelect = page.locator('#select-demo');
    this.multiSelect = page.locator('#multi-select');
    this.firstSelectedButton = page.locator('#printMe');
    this.lastSelectedButton = page.locator('#printAll');
    this.firstSelectionResult = page.locator('.genderbutton');
    this.lastSelectionResult = page.locator('.groupradiobutton');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }
}
