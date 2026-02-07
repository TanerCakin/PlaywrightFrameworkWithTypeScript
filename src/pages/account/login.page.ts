import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { ROUTES } from '../../config/constants';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly warningAlert: Locator;
  readonly warningText: Locator

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('E-Mail Address');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.locator('input[type="submit"][value="Login"]');
    this.warningAlert = page.locator('.alert');
    this.warningText = page.getByText('No match for E-Mail Address and/or Password.');
  }

 async open() {
  await this.goto(ROUTES.ACCOUNT_LOGIN);
  await this.emailInput.waitFor({ state: 'visible' });
}


  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
