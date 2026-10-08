import { expect, FrameLocator, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class NestedFramesPage extends BasePage {
  readonly url = appUrl('selenium-playground/nested-frames/');
  readonly topFrame: FrameLocator;
  readonly bottomFrame: FrameLocator;
  readonly leftNestedFrame: FrameLocator;
  readonly middleNestedFrame: FrameLocator;
  readonly rightNestedFrame: FrameLocator;
  readonly bottomFrameElement: Locator;
  readonly topFrameContent: Locator;
  readonly leftFrameContent: Locator;
  readonly middleFrameContent: Locator;
  readonly rightFrameContent: Locator;

  constructor(page: Page) {
    super(page);
    this.topFrame = page.frameLocator('frame[name="frame-top"]');
    this.bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
    this.bottomFrameElement = page.locator('frame[name="frame-bottom"]');
    this.leftNestedFrame = this.bottomFrame.frameLocator('frame[name="frame-left"]');
    this.middleNestedFrame = this.bottomFrame.frameLocator('frame[name="frame-middle"]');
    this.rightNestedFrame = this.bottomFrame.frameLocator('frame[name="frame-right"]');
    this.topFrameContent = this.topFrame.locator('body');
    this.leftFrameContent = this.leftNestedFrame.locator('body');
    this.middleFrameContent = this.middleNestedFrame.locator('body');
    this.rightFrameContent = this.rightNestedFrame.locator('body');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await this.page.waitForLoadState('networkidle');
    await expect(this.topFrameContent).toContainText('Top');
    await expect(this.bottomFrameElement).toBeVisible();
    await expect(this.leftFrameContent).toContainText('Left');
    await expect(this.middleFrameContent).toContainText('Middle');
    await expect(this.rightFrameContent).toContainText('Right');
  }
}
