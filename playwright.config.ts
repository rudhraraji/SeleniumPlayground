import config from './playwright-pom/playwright.config';

export default {
  ...config,
  testDir: './playwright-pom/src/tests',
  reporter: [['html']],
};
