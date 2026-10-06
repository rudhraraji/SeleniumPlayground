import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { appUrl } from '../config/environment';

export default class HoverPage extends BasePage {
  readonly url = appUrl('selenium-playground/hover-demo/');
  readonly heading: Locator;
  readonly buttonSectionHeadings: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Mouse Hover', exact: true });
    this.buttonSectionHeadings = page.getByRole('heading', {
      name: 'CSS Hover Effects on Button',
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.openPage(this.url, this.heading);
  }

  async movePointerAway(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.mouse.move(0, 0);
  }

  buttonTargets(sectionIndex: number): Locator {
    return this.buttonSectionHeadings
      .nth(sectionIndex)
      .locator('xpath=following-sibling::div[1]')
      .locator(':scope > div');
  }

  imageEffectSection(name: string): Locator {
    return this.page
      .getByRole('heading', { name, exact: true })
      .locator('xpath=following-sibling::*[1]');
  }

  image(name: string): Locator {
    return this.imageEffectSection(name).locator('img');
  }

  imageFigure(name: string): Locator {
    return this.imageEffectSection(name).locator('figure');
  }
}
