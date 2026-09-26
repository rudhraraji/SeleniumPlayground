import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class DragDropRangeSlidersPage extends BasePage {
  readonly url = appUrl('selenium-playground/drag-drop-range-sliders-demo/');
  readonly heading: Locator;
  readonly sliders: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Slider Demo', exact: true });
    this.sliders = page.locator('input[type="range"]');
  }

  async open(): Promise<void> {
    await this.navigateTo(this.url);
    await expect(this.heading).toBeVisible();
  }

  async setSliderValue(index: number, value: number): Promise<void> {
    const slider = this.sliders.nth(index);
    const min = Number(await slider.getAttribute('min'));
    const max = Number(await slider.getAttribute('max'));
    if (value < min || value > max) {
      throw new Error(`Slider value ${value} is outside the supported range ${min}-${max}`);
    }

    await slider.focus();
    await slider.press('Home');
    for (let current = min; current < value; current += 1) {
      await slider.press('ArrowRight');
    }

    await expect(slider).toHaveValue(String(value));
    await expect(slider.locator('xpath=..').locator('output')).toHaveText(String(value));
  }
}
