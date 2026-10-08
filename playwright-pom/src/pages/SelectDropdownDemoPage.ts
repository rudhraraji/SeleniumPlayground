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
    await expect(this.daySelect).toBeVisible();
    await expect(this.daySelect).toBeEnabled();
    await expect(this.multiSelect).toBeVisible();
    await expect(this.multiSelect).toBeEnabled();
    await expect(this.firstSelectedButton).toBeVisible();
    await expect(this.lastSelectedButton).toBeVisible();
  }

  async selectDay(day: string): Promise<void> {
    await this.daySelect.selectOption({ label: day });
  }

  async selectStates(states: string[]): Promise<void> {
    const options = states.map(label => ({ label }));
    await this.multiSelect.selectOption(options);
  }

  async showFirstSelectedState(): Promise<void> {
    await this.firstSelectedButton.click();
  }

  async showAllSelectedStates(): Promise<void> {
    await this.lastSelectedButton.click();
  }
}
