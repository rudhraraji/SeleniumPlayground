import { expect, FrameLocator, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class IframeDemoPage extends BasePage {
  readonly url = appUrl('selenium-playground/iframe-demo/');
  readonly heading: Locator;
  readonly editorFrame: FrameLocator;
  readonly webpageFrame: FrameLocator;
  readonly editor: Locator;
  readonly boldButton: Locator;
  readonly italicButton: Locator;
  readonly alignCenterButton: Locator;
  readonly strikeThroughButton: Locator;
  readonly underlineButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Simple iframe', exact: true });
    this.editorFrame = page.frameLocator('#iFrame1');
    this.webpageFrame = page.frameLocator('#iFrame2');
    this.editor = this.editorFrame.locator('[contenteditable="true"]');
    this.boldButton = this.editorFrame.getByTitle('Bold');
    this.italicButton = this.editorFrame.getByTitle('Italic');
    this.alignCenterButton = this.editorFrame.getByTitle('Align center');
    this.strikeThroughButton = this.editorFrame.getByTitle('Strike through');
    this.underlineButton = this.editorFrame.getByTitle('Underline');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }
}
