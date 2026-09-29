import { expect, test } from '@playwright/test';
import RedirectionPage from '../pages/RedirectionPage';

test('Redirection Demo › follows the link to the playground', async ({ page }) => {
  const redirectionPage = new RedirectionPage(page);
  await redirectionPage.open();

  await expect(redirectionPage.redirectLink).toHaveAttribute('href', redirectionPage.destinationUrl);
  await redirectionPage.redirectLink.click();
  await expect(page).toHaveURL(redirectionPage.destinationUrl);
});
