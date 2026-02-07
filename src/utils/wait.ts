import { Page } from '@playwright/test';

export async function waitForUrlIncludes(page: Page, text: string) {
  await page.waitForURL((url) => url.toString().includes(text));
}
