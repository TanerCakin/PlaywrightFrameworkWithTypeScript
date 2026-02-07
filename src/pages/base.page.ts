import type { Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

 async goto(path: string) {
  // If user passes a relative route without baseURL usage, make it absolute using baseURL from config
  // But easiest: always ensure we navigate to a FULL URL for now.
  const base = process.env.BASE_URL || 'https://tutorialsninja.com/demo';

  const finalUrl =
    path.startsWith('http') ? path :
    path.startsWith('/') ? `${base}${path}` :
    `${base}/${path}`;

  await this.page.goto(finalUrl);
}

}
