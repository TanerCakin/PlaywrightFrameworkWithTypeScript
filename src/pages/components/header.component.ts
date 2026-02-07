import { Page, Locator, expect } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly accountMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    // This is the account dropdown area (more stable than #top)
    this.accountMenu = page.locator('#top-links li.dropdown').filter({
      has: page.getByRole('link', { name: /my account/i }),
    });
  }

  async openRegister() {
    // Click the dropdown toggle inside the account menu
    await this.accountMenu.getByRole('link', { name: /my account/i }).click();

    // Now click Register inside the opened dropdown menu
    const register = this.accountMenu.getByRole('link', { name: /^register$/i });
    await expect(register).toBeVisible();
    await register.click();
  }
}
