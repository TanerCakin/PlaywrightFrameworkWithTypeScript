import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/account/login.page';
import { MyAccountPage } from '../pages/account/my-account.page';
import { HomePage } from '../pages/home.page';
import { RegisterPage } from '../pages/account/register.page';

type Fixtures = {
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  homePage: HomePage;
  registerPage: RegisterPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect };
