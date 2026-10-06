import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export interface ContactDetails {
  name: string;
  email: string;
  password: string;
  company: string;
  website: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  zip: string;
}

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
    await this.openPage(this.url, this.heading);
  }

  async fillForm(details: ContactDetails): Promise<void> {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    await this.passwordInput.fill(details.password);
    await this.companyInput.fill(details.company);
    await this.websiteInput.fill(details.website);
    await this.countrySelect.selectOption({ label: details.country });
    await this.cityInput.fill(details.city);
    await this.addressLine1Input.fill(details.addressLine1);
    await this.addressLine2Input.fill(details.addressLine2);
    await this.stateInput.fill(details.state);
    await this.zipInput.fill(details.zip);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}
