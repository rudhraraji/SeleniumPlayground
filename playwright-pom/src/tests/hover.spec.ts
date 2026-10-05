import { expect, test } from '../fixtures/test';
import HoverPage from '../pages/HoverPage';

async function cssValue(locator: import('@playwright/test').Locator, property: string): Promise<string> {
  return locator.evaluate((element, cssProperty) => getComputedStyle(element).getPropertyValue(cssProperty), property);
}

async function transformMetrics(locator: import('@playwright/test').Locator) {
  return locator.evaluate(element => {
    const transform = getComputedStyle(element).transform;
    if (transform === 'none') return { scale: 1, rotation: 0 };

    const matrix = new DOMMatrixReadOnly(transform);
    return {
      scale: Math.hypot(matrix.a, matrix.b),
      rotation: Math.atan2(matrix.b, matrix.a) * 180 / Math.PI,
    };
  });
}

test.describe('Mouse Hover Demo', () => {
  let hoverPage: HoverPage;

  test.beforeEach(async ({ page }) => {
    hoverPage = new HoverPage(page);
    await hoverPage.open();
  });

  test('changes the first button background on hover and restores it on mouse-out', async ({ page }) => {
    const button = hoverPage.buttonTargets(0).nth(0);
    const initialBackground = await cssValue(button, 'background-color');

    await button.hover();
    await expect.poll(() => cssValue(button, 'background-color')).not.toBe(initialBackground);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(button, 'background-color')).toBe(initialBackground);
  });

  test('changes the second button background on hover and restores it on mouse-out', async ({ page }) => {
    const button = hoverPage.buttonTargets(0).nth(1);
    const initialBackground = await cssValue(button, 'background-color');

    await button.hover();
    await expect.poll(() => cssValue(button, 'background-color')).not.toBe(initialBackground);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(button, 'background-color')).toBe(initialBackground);
  });

  test('underlines the link in the second button section on hover', async () => {
    const linkHover = hoverPage.buttonTargets(1).nth(0);
    const initialDecoration = await cssValue(linkHover, 'text-decoration-line');

    await linkHover.hover();
    await expect.poll(() => cssValue(linkHover, 'text-decoration-line')).not.toBe(initialDecoration);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(linkHover, 'text-decoration-line')).toBe(initialDecoration);
  });

  test('changes the text color of the second link-style target on hover', async () => {
    const textHover = hoverPage.buttonTargets(1).nth(1);
    const initialColor = await cssValue(textHover, 'color');

    await textHover.hover();
    await expect.poll(() => cssValue(textHover, 'color')).not.toBe(initialColor);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(textHover, 'color')).toBe(initialColor);
  });

  test('reveals content without changing the no-effect image', async () => {
    const image = hoverPage.image('No Effect only content show');
    const content = hoverPage.imageEffectSection('No Effect only content show').locator('.sp__text');
    const initialTransform = await cssValue(image, 'transform');
    const initialFilter = await cssValue(image, 'filter');

    await expect.poll(() => cssValue(content, 'opacity')).toBe('0');
    await image.hover();
    await expect.poll(() => cssValue(content, 'opacity')).toBe('1');
    await expect(cssValue(image, 'transform')).resolves.toBe(initialTransform);
    await expect(cssValue(image, 'filter')).resolves.toBe(initialFilter);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(content, 'opacity')).toBe('0');
  });

  test('zooms the image in on hover and restores its size on mouse-out', async () => {
    const image = hoverPage.image('Zoom In');
    const initialTransform = await cssValue(image, 'transform');
    const initialScale = (await transformMetrics(image)).scale;

    await image.hover();
    await expect.poll(async () => (await transformMetrics(image)).scale).toBeGreaterThan(initialScale);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'transform')).toBe(initialTransform);
  });

  test('zooms the image out on hover and restores its size on mouse-out', async () => {
    const image = hoverPage.image('Zoom Out');
    const initialTransform = await cssValue(image, 'transform');
    const initialScale = (await transformMetrics(image)).scale;

    await image.hover();
    await expect.poll(async () => (await transformMetrics(image)).scale).toBeLessThan(initialScale);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'transform'), { timeout: 10000 }).toBe(initialTransform);
  });

  test('pans the image on hover and restores its position on mouse-out', async () => {
    const image = hoverPage.image('Pan');
    const initialMargin = await cssValue(image, 'margin-left');

    await image.hover();
    await expect.poll(() => cssValue(image, 'margin-left')).not.toBe(initialMargin);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'margin-left'), { timeout: 10000 }).toBe(initialMargin);
  });

  test('rotates and zooms the image out on hover, then restores it', async () => {
    const image = hoverPage.image('Rotate(+Zoom Out)');
    const initialTransform = await cssValue(image, 'transform');
    const initialMetrics = await transformMetrics(image);

    await image.hover();
    await expect.poll(async () => (await transformMetrics(image)).rotation).toBeCloseTo(0, 1);
    await expect.poll(async () => (await transformMetrics(image)).scale).toBeLessThan(initialMetrics.scale);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'transform'), { timeout: 10000 }).toBe(initialTransform);
  });

  test('blurs the image on hover and removes the blur on mouse-out', async () => {
    const image = hoverPage.image('Blur');
    const figure = hoverPage.imageFigure('Blur');
    const initialFilter = await cssValue(figure, 'filter');

    await image.hover();
    await expect.poll(() => cssValue(figure, 'filter')).not.toBe(initialFilter);

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(figure, 'filter')).toBe(initialFilter);
  });

  test('changes the grayscale image to color on hover and restores grayscale', async () => {
    const image = hoverPage.image('Gray Scale to Color');
    const initialFilter = await cssValue(image, 'filter');
    expect(initialFilter).toContain('grayscale');

    await image.hover();
    await expect.poll(() => cssValue(image, 'filter'), { timeout: 10000 }).toBe('grayscale(0)');

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'filter')).toBe(initialFilter);
  });

  test('applies blur and grayscale together on hover and resets both on mouse-out', async () => {
    const image = hoverPage.image('Blur + Gray Scale');
    const initialFilter = await cssValue(image, 'filter');

    await image.hover();
    await expect.poll(() => cssValue(image, 'filter')).toContain('blur(3px)');
    expect(await cssValue(image, 'filter')).toContain('grayscale(1)');

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'filter')).toBe(initialFilter);
  });

  test('reduces image opacity on hover and restores it on mouse-out', async () => {
    const image = hoverPage.image('Opacity');
    const figure = hoverPage.imageFigure('Opacity');
    const initialOpacity = await cssValue(figure, 'opacity');

    await image.hover();
    await expect.poll(() => cssValue(figure, 'opacity')).toBe('0.4');

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(figure, 'opacity')).toBe(initialOpacity);
  });

  test('starts the flashing animation on hover and stops on mouse-out', async () => {
    const image = hoverPage.image('Flashing');
    const initialAnimation = await cssValue(image, 'animation-name');

    await image.hover();
    await expect.poll(() => cssValue(image, 'animation-name')).toBe('flash');

    await hoverPage.movePointerAway();
    await expect.poll(() => cssValue(image, 'animation-name')).toBe(initialAnimation);
  });
});
