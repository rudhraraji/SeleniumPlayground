import { expect, test } from '../fixtures/test';
import RedirectionPage from '../pages/RedirectionPage';

test.describe('Redirection Demo', () => {
  let redirectionPage: RedirectionPage;

  test.beforeEach(async ({ page }) => {
    redirectionPage = new RedirectionPage(page);
    await redirectionPage.open();
  });

  test('points to the playground destination', async () => {
    await expect(redirectionPage.redirectLink).toHaveAttribute(
      'href',
      redirectionPage.destinationUrl,
    );
  });

  test('follows the link to the playground', async () => {
    await redirectionPage.followRedirect();
  });
});
