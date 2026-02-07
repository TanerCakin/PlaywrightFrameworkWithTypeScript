import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { ROUTES } from '../../config/constants.js';

export class MyAccountPage extends BasePage {
  // On successful login, OpenCart usually lands on Account page with "My Account" heading
  readonly heading: Locator = this.page.getByRole('heading', { name: /my account/i });

  // There’s usually a right column menu including Logout.
  readonly logoutLink: Locator = this.page.getByRole('link', { name: /logout/i });

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto(ROUTES.ACCOUNT_HOME);
    await this.waitForDomReady();
  }

  async logout() {
    await this.logoutLink.click();
    await this.waitForDomReady();
  }
}
