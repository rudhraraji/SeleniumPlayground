import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class JqueryDropdownSearchPage extends BasePage {
  readonly url = appUrl('selenium-playground/jquery-dropdown-search-demo/');
  readonly heading: Locator;
  readonly countryDropdown: Locator;
  readonly statesDropdown: Locator;
  readonly disabledCountryOptions: Locator;
  readonly country: Locator;
  readonly multipleStates: Locator;
  readonly fileCategory: Locator;
  private readonly searchField: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', {
      name: 'Jquery Dropdown Search Demo',
      exact: true,
    });
    this.countryDropdown = page.locator('#country + .select2 .select2-selection');
    this.statesDropdown = page.locator('.js-example-basic-multiple + .select2 .select2-selection');
    this.country = page.locator('#country');
    this.disabledCountryOptions = page.locator(
      '.js-example-disabled-results option:disabled',
    );
    this.multipleStates = page.locator('.js-example-basic-multiple');
    this.fileCategory = page.locator('#files');
    this.searchField = page.locator('.select2-container--open .select2-search__field');
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
    await expect(this.countryDropdown).toBeVisible();
    await expect(this.statesDropdown).toBeVisible();
    await expect(this.fileCategory).toBeVisible();
  }

  async selectCountry(country: string): Promise<void> {
    await this.countryDropdown.click();
    await this.searchField.fill(country);
    await this.page.getByRole('treeitem', { name: country, exact: true }).click();
  }

  async selectStates(states: string[]): Promise<void> {
    for (const state of states) {
      await this.statesDropdown.click();
      await this.searchField.fill(state);
      await this.page.getByRole('treeitem', { name: state, exact: true }).click();
    }
  }
}
