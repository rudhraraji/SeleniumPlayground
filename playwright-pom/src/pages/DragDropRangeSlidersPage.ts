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
    await this.openPage(this.url, this.heading);
  }

  async setSliderValue(index: number, value: number): Promise<void> {
    const slider = this.sliders.nth(index);
    const min = Number(await slider.getAttribute('min'));
    const max = Number(await slider.getAttribute('max'));
    if (value < min || value > max) {
      throw new Error(`Slider value ${value} is outside the supported range ${min}-${max}`);
    }

    const currentValue = Number(await slider.inputValue());
    const step = Number(await slider.getAttribute('step')) || 1;
    const key = value > currentValue ? 'ArrowRight' : 'ArrowLeft';
    const steps = Math.abs(value - currentValue) / step;
    if (!Number.isInteger(steps)) {
      throw new Error(`Slider value ${value} cannot be reached with step ${step}`);
    }
    await slider.focus();
    for (let currentStep = 0; currentStep < steps; currentStep += 1) {
      await slider.press(key);
    }

    const output = slider.locator('xpath=..').locator('output');
    await expect(slider).toHaveValue(String(value));
    await expect(output).toHaveText(String(value));
  }
}
