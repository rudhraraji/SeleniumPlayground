import { test, expect } from '../fixtures/test';
import BootstrapListBoxPage from '../pages/BootstrapListBoxPage';

test.describe('BootstrapListBoxPage', () => {

  test.beforeEach(async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);

    await bootstrapListBoxPage.open();
    await bootstrapListBoxPage.waitForPageToLoad();
  });

  test('Bootstrap Dual List Box: Validate page load and UI elements', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);

    // Validate heading
    await bootstrapListBoxPage.validatePageHeading();

    // Validate left panel
    await expect(bootstrapListBoxPage.txtLeftSearch).toBeVisible();
    await expect(bootstrapListBoxPage.btnLeftAllItems).toBeVisible();
    await expect(bootstrapListBoxPage.lstLeftItems).toBeVisible();
    await expect(bootstrapListBoxPage.btnMoveToRight).toBeVisible();

    // Validate right panel
    await expect(bootstrapListBoxPage.txtRightSearch).toBeVisible();
    await expect(bootstrapListBoxPage.btnRightAllItems).toBeVisible();
    await expect(bootstrapListBoxPage.lstRightItems).toBeVisible();
    await expect(bootstrapListBoxPage.btnMoveToLeft).toBeVisible();
  });


  test('Bootstrap Dual List Box: Move Item Right to Left', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);
    const movedItem = 'Grange';
    await bootstrapListBoxPage.enterSearchRightItem(movedItem);
    await bootstrapListBoxPage.moveItemRightToLeft(movedItem);
    const lastLeftItem = await bootstrapListBoxPage.lastLeftItem();
    expect(lastLeftItem).toBe(movedItem);
  });

  test('Bootstrap Dual List Box: Move Item Left to Right', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);
    const movedItem = 'Danville';
    await bootstrapListBoxPage.enterSearchLeftItem(movedItem);
    await bootstrapListBoxPage.moveItemLeftToRight(movedItem);
    const lastRightItem = await bootstrapListBoxPage.lastRightItem();
    expect(lastRightItem).toBe(movedItem);
  });


  test('Bootstrap Dual List Box: Search Item in Right panel', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);
    await bootstrapListBoxPage.enterSearchRightItem('Grange');
    await bootstrapListBoxPage.selectSearchedItem('Grange');
  });

  test('Bootstrap Dual List Box: Search Item in Left panel', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);
    await bootstrapListBoxPage.enterSearchLeftItem('Danville');
    await bootstrapListBoxPage.selectSearchedItem('Danville');
  });

  test('Bootstrap List Box Page: left to right', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);
    await bootstrapListBoxPage.moveAllItemsLeftToRight();
  });

  test('Bootstrap List Box Page: right to left', async ({ page }) => {
    const bootstrapListBoxPage = new BootstrapListBoxPage(page);
    await bootstrapListBoxPage.moveAllItemsRightToLeft();
  });
});