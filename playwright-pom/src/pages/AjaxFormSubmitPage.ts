import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';


export default class AjaxFormSubmitPage extends BasePage {

  readonly url = appUrl('selenium-playground/ajax-form-submit-demo/');


  readonly heading: Locator;
  readonly lblName: Locator;
  readonly txtName: Locator;
  readonly requiredName: Locator;
  readonly lblMessage: Locator;
  readonly txtMessage: Locator;
  readonly btnSubmit: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Form Submit Demo' });
    this.lblName = page.getByText('Name:');
    this.txtName = page.locator('#title');
    this.lblMessage = page.getByText('Message:');
    this.txtMessage = page.locator('#description');
    this.btnSubmit = page.getByRole('button', { name: 'submit' });
    this.requiredName = page.getByText('*Name:');
    //page.locator('.title-validation.validation-error');
    //page.getByText('*Name:')
  }
  async open() {
    await this.navigateTo(this.url);
  }
  async waitForPageToLoad() {
    await this.page.waitForURL('**/ajax-form-submit-demo/');
  }
  async validatePageHeading() {
    await expect(this.heading).toContainText('Form Submit Demo');
  }
  async validateNameText() {
    await expect(this.txtName).toBeEmpty();
  }
  async validateMessageText() {
    await expect(this.txtMessage).toBeEmpty();
  }
  async validateRequiredName() {
    await expect(this.page.locator('label:has-text("Name")').first()).toContainText('Name');
  }

  async validateTextBorder() {
    await expect(this.txtName).toBeVisible();
    const borderColor = await this.txtName.evaluate(el => getComputedStyle(el).borderColor);
    expect(['rgb(221, 221, 221)', 'rgb(255, 0, 0)']).toContain(borderColor);
  }
  async waitForTextboxToLoad() {
    await this.waitForElement(this.txtName);
  }
  async clickSubmitBtn() {
    await this.btnSubmit.scrollIntoViewIfNeeded();
    await this.btnSubmit.click({ force: true });
  }
}
