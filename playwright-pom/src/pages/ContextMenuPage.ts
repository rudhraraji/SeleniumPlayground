import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class ContextMenuPage extends BasePage {
  readonly url = appUrl('selenium-playground/context-menu/');
  readonly heading: Locator;
  readonly instructions: Locator;
  readonly contextMenuTarget: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Context Menus', exact: true });
    this.instructions = page.getByText(
      'When you right-click inside the below box, it will trigger a JavaScript alert.',
      { exact: true },
    );
    this.contextMenuTarget = page.locator('#hot-spot');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
