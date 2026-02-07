import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { ROUTES } from '../../config/constants';


// locators + actions for Register page
export class RegisterPage extends BasePage {
  // Parent containers (for chaining / scoping)
  readonly form: Locator;
  readonly accountDetails: Locator;

  // Mandatory fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly heading: Locator;

  // Controls
  readonly newsletterNoRadio: Locator;
  readonly privacyPolicyCheckbox: Locator;
  readonly continueButton: Locator;
  readonly newsletterYesRadio: Locator;

    // Global warning (top pink alert)
  readonly pageWarningAlert: Locator;

  // Field-level errors (all)
  readonly fieldErrors: Locator;

  // Field-specific error locators (optional but very useful)
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly telephoneError: Locator;
  readonly passwordError: Locator;


  constructor(page: Page) {
    super(page); // initializes BasePage.page

    // Parent containers (chaining base)
    this.form = page.locator('form.form-horizontal');
    this.accountDetails = this.form.locator('fieldset#account');

    this.heading = this.form.getByRole('heading', { name: /register account/i });

    // Inputs inside the account fieldset (chained locators)
    this.firstNameInput = this.accountDetails.locator('#input-firstname');
    this.lastNameInput = this.accountDetails.locator('#input-lastname');
    this.emailInput = this.accountDetails.locator('#input-email');
    this.telephoneInput = this.accountDetails.locator('#input-telephone');

    // Password fields (also inside the same form)
    this.passwordInput = this.form.locator('#input-password');
    this.confirmPasswordInput = this.form.locator('#input-confirm');

    // Newsletter radios (inside the form)
    // OpenCart: input[name="newsletter"] value="0" is No
    this.newsletterNoRadio = this.form.locator('input[name="newsletter"][value="0"]');

    // Privacy Policy checkbox (inside the form)
    this.privacyPolicyCheckbox = this.form.locator('input[name="agree"]');

    // Continue button (inside the form)
    this.continueButton = this.form.getByRole('button', { name: /^continue$/i });

    // Newsletter radios
    this.newsletterYesRadio = this.form.locator('input[name="newsletter"][value="1"]');
    this.newsletterNoRadio = this.form.locator('input[name="newsletter"][value="0"]');

        // Global top alert
    this.pageWarningAlert = page.locator('.alert.alert-danger');

    // All field errors (OpenCart uses .text-danger for field validation messages)
    this.fieldErrors = this.form.locator('.text-danger');

    // Specific field errors (stable: follow the input)
    this.firstNameError = this.form.locator('#input-firstname + .text-danger');
    this.lastNameError = this.form.locator('#input-lastname + .text-danger');
    this.emailError = this.form.locator('#input-email + .text-danger');
    this.telephoneError = this.form.locator('#input-telephone + .text-danger');
    this.passwordError = this.form.locator('#input-password + .text-danger');

  }

  // Step: Newsletter = Yes
  async selectNewsletterYes() {
    await this.newsletterYesRadio.check();
  }

  // Step 1: Open Register page
  async open() {
    await this.goto(ROUTES.ACCOUNT_REGISTER);
  }

  // Step 2: Fill mandatory fields
  async fillMandatoryFields(data: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.telephoneInput.fill(data.telephone);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
  }

  // Step 3: Newsletter = No (if applicable)
  async selectNewsletterNoIfVisible() {
    // Some pages/themes may hide newsletter section; keep safe
    if (await this.newsletterNoRadio.isVisible().catch(() => false)) {
      await this.newsletterNoRadio.check();
    }
  }

  // Step 4: Accept Privacy Policy
  async acceptPrivacyPolicy() {
    await this.privacyPolicyCheckbox.check();
  }

  // Step 5: Click Continue
  async clickContinue() {
    await this.continueButton.click();
  }
  
  //This lets you assert all errors without writing 5 locators manually.
  async getAllFieldErrorTexts(): Promise<string[]> {
  const texts = await this.fieldErrors.allTextContents();
  return texts.map(t => t.trim()).filter(Boolean);
}

}
