# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playground.spec.ts >> PlaygroundPage >> Playground: Validate canonical URL after navigating to "Select Dropdown List"
- Location: src/tests/playground.spec.ts:22:9

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.testmuai.com/selenium-playground/
Call log:
  - navigating to "https://www.testmuai.com/selenium-playground/", waiting until "networkidle"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export default class BasePage {
  4  |   protected readonly page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  | 
  10 |   async navigateTo(url: string): Promise<void> {
> 11 |     await this.page.goto(url, {
     |                     ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.testmuai.com/selenium-playground/
  12 |       waitUntil: 'networkidle'
  13 |     });
  14 |   }
  15 | 
  16 |   async getTitle(): Promise<string> {
  17 |     return this.page.title();
  18 |   }
  19 | 
  20 |   async waitForPageLoad(): Promise<void> {
  21 |     await this.page.waitForLoadState('networkidle');
  22 |   }
  23 |    async waitForElement(selector: string) {
  24 |     await this.page.locator(selector).waitFor({ state: 'visible' });
  25 |   }
  26 | 
  27 |   async click(selector: string) {
  28 |     await this.page.locator(selector).click();
  29 |   }
  30 | 
  31 |   async fill(selector: string, value: string) {
  32 |     await this.page.locator(selector).fill(value);
  33 |   }
  34 | 
  35 |   async getText(selector: string) {
  36 |     return await this.page.locator(selector).textContent();
  37 |   }
  38 | }
```