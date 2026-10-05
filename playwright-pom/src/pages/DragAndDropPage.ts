import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class DragAndDropPage extends BasePage {
  readonly url = appUrl('selenium-playground/drag-and-drop-demo/');
  readonly heading: Locator;
  readonly resetButton: Locator;
  readonly draggableItems: Locator;
  readonly dropTarget: Locator;
  readonly droppedItems: Locator;
  readonly secondDemoDragTarget: Locator;
  readonly secondDemoDropTarget: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Drag and Drop Demo', exact: true });
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.draggableItems = page.locator('[draggable="true"]');
    this.dropTarget = page.locator('#mydropzone');
    this.droppedItems = page.locator('#droppedlist');
    this.secondDemoDragTarget = page.getByText('Drag me to my target', { exact: true });
    this.secondDemoDropTarget = page.locator('#droppable');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
    await this.page.waitForFunction(() => {
      return typeof (window as Window & { __resetDragDropDemo?: () => void }).__resetDragDropDemo === 'function';
    });
  }
}
