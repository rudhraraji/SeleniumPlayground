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
    await this.openPage(this.url, this.heading);
    await expect(this.basicRadioButtons).toHaveCount(2);
    await expect(this.basicValueButton).toBeVisible();
    await expect(this.genderRadioButtons).toHaveCount(3);
    await expect(this.ageRadioButtons).toHaveCount(3);
    await expect(this.getValuesButton).toBeVisible();
  }

  async checkGenderAndAge(gender: string, ageGroup: string): Promise<void> {
    await this.page.locator(`input[name="gender"][value="${gender}"]`).check();
    await this.page.locator(`input[name="ageGroup"][value="${ageGroup}"]`).check();
    await this.getValuesButton.click();
  }

  async expectResults(gender: string, ageGroup: string): Promise<void> {
    await expect(this.results).toContainText([`Gender : ${gender}`, `Age : ${ageGroup}`]);
  }
}
