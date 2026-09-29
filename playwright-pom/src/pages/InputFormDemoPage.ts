import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class InputFormDemoPage extends BasePage {
  readonly url = appUrl('selenium-playground/input-form-demo/');
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly companyInput: Locator;
  readonly websiteInput: Locator;
  readonly countrySelect: Locator;
  readonly cityInput: Locator;
  readonly addressLine1Input: Locator;
  readonly addressLine2Input: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Form Demo', exact: true });
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#inputEmail4');
    this.passwordInput = page.locator('#inputPassword4');
    this.companyInput = page.locator('#company');
    this.websiteInput = page.locator('#websitename');
    this.countrySelect = page.locator('select[name="country"]');
    this.cityInput = page.locator('#inputCity');
    this.addressLine1Input = page.locator('#inputAddress1');
    this.addressLine2Input = page.locator('#inputAddress2');
    this.stateInput = page.locator('#inputState');
    this.zipInput = page.locator('#inputZip');
    this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
    this.successMessage = page.getByText('Thanks for contacting us, we will get back to you shortly.', {
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.heading).toBeVisible();
  }
}
