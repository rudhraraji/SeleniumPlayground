import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';


export default class AjaxFormSubmitPage extends BasePage {

  readonly url = 'https://www.testmuai.com/selenium-playground/ajax-form-submit-demo/';
  readonly page: Page;


  readonly heading: Locator;
  readonly lblName: Locator;
  readonly txtName: Locator;
  readonly requiredName: Locator;
  readonly lblMessage: Locator;
  readonly txtMessage: Locator;
  readonly btnSubmit: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

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
  async validateNameText(){
    await expect(this.txtName).toBeEmpty();
  }
  async validateMessageText(){
    await expect(this.txtMessage).toBeEmpty();
  }
  async validateRequiredName() {
  await expect(this.requiredName).toBeVisible();
  await expect(this.requiredName).toContainText('*');
  
  console.log(await this.requiredName.count());
}
  async validateTextBorder() {
  await expect(this.txtName).toBeVisible();
  await expect(this.txtName).toHaveCSS(
    'border-color',
    'rgb(255, 0, 0)'
  );

  console.log(await this.txtName.count());
}
  async waitForTextboxToLoad() {
    await this.waitForElement('#title');
  }
  async clickSubmitBtn(){
    await this.btnSubmit.click();
  }
}