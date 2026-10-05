import { defineConfig } from '@playwright/test';
import { baseUrl } from './src/config/environment';

export default defineConfig({
  testDir: './src/tests',
  use: {
    baseURL: baseUrl,
    headless: true,
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },

  timeout: 60000,

 // retries: 2, 

  expect: {
    timeout: 5000,
  },

  reporter: [['html'], ['allure-playwright']],

});