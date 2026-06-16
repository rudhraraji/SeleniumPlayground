import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  timeout: 30000,

  retries: 2, // Retry failed tests up to 2 times

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    headless: true,
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },
});