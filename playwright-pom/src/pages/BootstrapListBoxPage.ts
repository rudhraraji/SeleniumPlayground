import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class BootstrapListBoxPage extends BasePage {

  readonly url = appUrl('selenium-playground/bootstrap-dual-list-box-demo/');

  readonly headingBootstrapDualList: Locator;
  readonly txtLeftSearch: Locator;
  readonly btnLeftAllItems: Locator;
  readonly lstLeftItems: Locator;
  readonly btnMoveToRight: Locator;
  readonly txtRightSearch: Locator;
  readonly btnRightAllItems: Locator;
  readonly lstRightItems: Locator;
  readonly btnMoveToLeft: Locator;

  constructor(page: Page) {
    super(page);
    this.headingBootstrapDualList = page.getByRole('heading', { name: 'Bootstrap Dual List Demo' });

    // Left Panel
    this.txtLeftSearch = page.getByRole('textbox', { name: 'search' }).first();
    this.btnLeftAllItems = page.getByText('All').nth(4);
    this.lstLeftItems = page.getByText('AllKedungjenarDanvilleMynamaki');
    this.btnMoveToRight = page.locator('button.move-right');

    // Right Panel
    this.txtRightSearch = page.getByRole('textbox', { name: 'search' }).nth(1);
    this.btnRightAllItems = page.getByText('All').nth(5);
    this.lstRightItems = page.getByText('AllMilanNgodoGrange');
    this.btnMoveToLeft = page.locator('button.move-left');
  }
  async open() {
    await this.navigateTo(this.url);
  }
  async waitForPageToLoad() {
    await this.page.waitForURL('**/bootstrap-dual-list-box-demo/');
  }
  async validatePageHeading() {
    await expect(this.headingBootstrapDualList).toContainText('Bootstrap Dual List Demo');
  }

  async enterSearchLeftItem(leftSearch: string) {
    console.log(`Entering Search item: ${leftSearch}`);
    await this.txtLeftSearch.click();
    await this.txtLeftSearch.type(leftSearch, { delay: 50 });
    await this.txtLeftSearch.press('Enter');
  }

  async enterSearchRightItem(rightSearch: string) {
    console.log(`Entering Search item: ${rightSearch}`);
    await this.txtRightSearch.click();
    await this.txtRightSearch.type(rightSearch, { delay: 50 });
    await this.txtRightSearch.press('Enter');
  }

  async selectSearchedItem(searchedItem: string) {
    console.log(`Searched Item: ${searchedItem}`);
    await this.page.getByText(searchedItem).click();
  }
  async clickRandomLeftItem() {
    const count = await this.lstLeftItems.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomItem = this.lstLeftItems.nth(randomIndex);
    const itemText = await randomItem.textContent();
    console.log(`Selected item: ${itemText}`);
    await randomItem.click();
  }

  async lastLeftItem() {
    const lastItem = this.page.locator('.list-left li').last();
    await expect(lastItem).toBeVisible();
    return (await lastItem.textContent())?.trim() || '';
    console.log(`lastitem: ${lastItem}`);
  }
  async lastRightItem() {
    const lastItem = this.page.locator('.list-right li').last();
    await expect(lastItem).toBeVisible();
    return (await lastItem.textContent())?.trim() || '';
    console.log(`lastitem: ${lastItem}`);
  }

  async moveItemLeftToRight(itemName: string) {
    console.log(`Move Item Left to Right: ${itemName}`);
    const item = this.page.locator('.list-left li').filter({
      hasText: itemName,
    });
    await item.click();
    await this.btnMoveToRight.click();
  }

  async moveItemRightToLeft(itemName: string) {
    console.log(`Move Item Right to Left: ${itemName}`);
    const item = this.page.locator('.list-right li').filter({
      hasText: itemName,
    });
    await item.click();
    await this.btnMoveToLeft.click();
  }

  async moveAllItemsLeftToRight(): Promise<void> {
    const items = this.page.locator('.list-left li');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await items.nth(i).click();
    }
    await this.btnMoveToRight.click();
  }

  async moveAllItemsRightToLeft(): Promise<void> {
    const items = this.page.locator('.list-right li');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await items.nth(i).click();
    }
    await this.btnRightAllItems.click();
  }


  async moveItem(
    itemName: string,
    direction: 'leftToRight' | 'rightToLeft'
  ): Promise<void> {
    const item =
      direction === 'leftToRight'
        ? this.page.locator('.list-left li').filter({ hasText: itemName })
        : this.page.locator('.list-right li').filter({ hasText: itemName });

    await item.click();

    if (direction === 'leftToRight') {
      await this.btnMoveToRight.click();
    } else {
      await this.btnMoveToLeft.click();
    }
    console.log(`lastitem: ${itemName}`);
  }
}
