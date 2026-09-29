import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class RadioButtonPage extends BasePage {
  readonly url = appUrl('selenium-playground/radiobutton-demo/');
  readonly heading: Locator;
  readonly basicRadioButtons: Locator;
  readonly basicValueButton: Locator;
  readonly disabledRadioButton: Locator;
  readonly genderRadioButtons: Locator;
  readonly ageRadioButtons: Locator;
  readonly getValuesButton: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Radio button Demo', exact: true });
    this.basicRadioButtons = page.locator('input[name="optradio"]');
    this.basicValueButton = page.locator('#buttoncheck');
    this.disabledRadioButton = page.locator('input[name="prop"][disabled]');
    this.genderRadioButtons = page.locator('input[name="gender"]');
    this.ageRadioButtons = page.locator('input[name="ageGroup"]');
    this.getValuesButton = page.getByRole('button', { name: 'Get values', exact: true });
    this.results = page.locator('main').getByText(/Gender :|Age :/);
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
