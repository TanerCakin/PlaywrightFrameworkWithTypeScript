import { test, expect } from '../../src/fixtures/test';
import { Users } from '../../src/test-data/users';
import { hasValidCredentials } from '../../src/config/env';
import { waitForUrlIncludes } from '../../src/utils/wait';

test.describe('Account Login', () => {
  test('should show warning for invalid credentials', async ({ loginPage }) => {
  
    await loginPage.open();
    await loginPage.login(Users.invalid.email, Users.invalid.password);

    await expect(loginPage.warningAlert).toBeVisible();
    await expect(loginPage.warningText).toBeVisible();
  });

 test('should login successfully with valid credentials (requires .env)', async ({ loginPage, myAccountPage }) => {
  test.skip(!hasValidCredentials(), 'TN_EMAIL/TN_PASSWORD are not set in .env');

  await loginPage.open();
  await loginPage.login(Users.valid.email, Users.valid.password);

  await expect(myAccountPage.heading).toBeVisible();
  });
});
