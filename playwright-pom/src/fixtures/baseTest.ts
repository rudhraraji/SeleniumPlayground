import { test as base } from '@playwright/test';
import BasePage from '../pages/BasePage';
import PlaygroundPage from '../pages/PlaygroundPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AjaxFormSubmitPage from '../pages/AjaxFormSubmitPage';
import BootstrapListBoxPage from '../pages/BootstrapListBoxPage';

type Pages = {
  basePage: BasePage;
  playgroundPage: PlaygroundPage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  ajaxFormSubmitPage: AjaxFormSubmitPage;
  bootstrapListBoxPage: BootstrapListBoxPage;
};

export const test = base.extend<Pages>({
   basePage: async ({ page }, use) => {
     await use(new BasePage(page));
   },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  ajaxFormSubmitPage: async ({ page }, use) => {
    await use(new AjaxFormSubmitPage(page));
  },
  bootstrapListBoxPage: async ({ page }, use) => {
    await use(new BootstrapListBoxPage(page));
  },
  playgroundPage: async ({ page }, use) => {
    await use(new PlaygroundPage(page));
  }
});

export { expect } from '@playwright/test';