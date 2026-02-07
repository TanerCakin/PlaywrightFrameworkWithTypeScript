import { ROUTES } from '../../src/config/constants';
import { expect, test } from '../../src/fixtures/test';
import {uniqueEmail, randomFirstName, randomLastName, randomTelephone, validPassword } from '../../src/utils/testData';
import { createValidRegisterUser } from '../../src/utils/testData';

test.describe('Account Registration', () => {

  test('TC_REG_001 - Navigate to Register page from Home', async ({ homePage, registerPage, page }) => {
    // 1. Open Home Page
    await homePage.open();

    // 2-3. Click My Account -> Click Register
    await homePage.header.openRegister();

    // Proof (assertion): we are on Register page
    await expect(page).toHaveURL(`${ROUTES.DOMAIN}${ROUTES.ACCOUNT_REGISTER}`);

  });
  test('TC_REG_002 - Register with mandatory fields', async ({ registerPage }) => {
    // 1. Open Register page
    await registerPage.open();

    // 2. Fill mandatory fields
    await registerPage.fillMandatoryFields({
          firstName: randomFirstName(),
          lastName: randomLastName(),
          email: uniqueEmail(),
          telephone: randomTelephone(),
          password: validPassword(),
    });

    // 3. Newsletter = No (if applicable)
    await registerPage.selectNewsletterNoIfVisible();

    // 4. Accept Privacy Policy
    await registerPage.acceptPrivacyPolicy();

    // 5. Click Continue
    await registerPage.clickContinue();
    });

test('TC_REG_003 - Register with Newsletter Yes', async ({ registerPage }) => {
    // 1. Open Register page
    await registerPage.open();

    // 2. Fill all fields
    await registerPage.fillMandatoryFields(createValidRegisterUser());

    // 3. Select Newsletter = Yes
    await registerPage.selectNewsletterYes();

    // 4. Accept Privacy Policy
    await registerPage.acceptPrivacyPolicy();

    // 5. Click Continue
    await registerPage.clickContinue();
 
   });
  test('TC_REG_004 - Submit empty registration form', async ({ registerPage }) => {
    // 1. Open Register page
    await registerPage.open();
    // 2. Click Continue without filling anything
    await registerPage.clickContinue();
    // Proof: validation errors are shown for required fields
    // 3. Global warning (privacy policy)
    await expect(registerPage.pageWarningAlert).toBeVisible();
    await expect(registerPage.pageWarningAlert).toContainText(/privacy policy/i);

    // 4. Field-level warnings (assert all in one clean way)
    const errors = await registerPage.getAllFieldErrorTexts();

    // Assert important ones exist (order-independent)
    expect(errors).toEqual(
      expect.arrayContaining([
      expect.stringMatching(/first name must be between/i),
      expect.stringMatching(/last name must be between/i),
      expect.stringMatching(/e-?mail address does not appear to be valid/i),
      expect.stringMatching(/telephone must be between/i),
      expect.stringMatching(/password must be between/i),
   ])
  );
  });
  });
  test('TC_REG_005 - Register without accepting Privacy Policy', async ({ registerPage }) => {
    // 1. Open Register page
    await registerPage.open();

    // 2. Fill all fields
    await registerPage.fillMandatoryFields(createValidRegisterUser());

    // 3. Select Newsletter = Yes
    await registerPage.selectNewsletterYes();

    // 4. Click Continue
    await registerPage.clickContinue();
    });