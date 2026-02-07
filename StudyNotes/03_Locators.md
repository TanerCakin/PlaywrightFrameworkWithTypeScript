# Locators (Playwright)

## Definition
Locators are Playwright’s mechanism to **find and interact with elements** on a web page.

Unlike Selenium, Playwright locators are:
- **Auto-waiting**
- **Retryable**
- **Lazy-evaluated**
- **Resilient to DOM changes**

👉 Locators are the **most important concept** for stable automation.

---

## What is a Locator (Conceptually)?

A locator is **not an element**.  
It is a **query** that Playwright repeatedly evaluates until:
- The element appears
- The action becomes possible
- The assertion passes

```ts
const loginButton = page.getByRole('button', { name: 'Login' });
The element is resolved only when used.

Why Locators Matter in Automation
Bad locators = ❌ flaky tests
Good locators = ✅ stable tests

Most flaky tests fail because of:

Dynamic IDs

Fragile XPaths

Timing issues

Playwright locators solve this.

Recommended Locator Priority (VERY IMPORTANT)
Playwright officially recommends this order:

getByRole ✅ (BEST)

getByLabel

getByText

getByPlaceholder

getByTestId

CSS / XPath ❌ (LAST RESORT)

1️⃣ getByRole (BEST PRACTICE)
Definition
Locates elements by ARIA role and accessible name.

Example HTML
html
Copy code
<button>Login</button>
Playwright
ts
Copy code
page.getByRole('button', { name: 'Login' });
Why it’s best
Stable

User-centric

Accessibility-friendly

Survives UI refactors

2️⃣ getByLabel
Definition
Locates form inputs by their <label>.

HTML
html
Copy code
<label>Email</label>
<input type="email" />
Playwright
ts
Copy code
page.getByLabel('Email').fill('user@test.com');
Automation use
Forms

Login / Signup pages

3️⃣ getByText
Definition
Finds elements by visible text.

HTML
html
Copy code
<span>Forgot Password?</span>
Playwright
ts
Copy code
page.getByText('Forgot Password?').click();
Regex support
ts
Copy code
page.getByText(/forgot/i);
4️⃣ getByPlaceholder
HTML
html
Copy code
<input placeholder="Search..." />
Playwright
ts
Copy code
page.getByPlaceholder('Search...').fill('Playwright');
5️⃣ getByTestId
Definition
Uses a dedicated test attribute.

HTML
html
Copy code
<button data-testid="login-btn">Login</button>
Playwright
ts
Copy code
page.getByTestId('login-btn').click();
When to use
No good roles/text

Dynamic UI frameworks

6️⃣ CSS & XPath (LAST RESORT)
CSS
ts
Copy code
page.locator('.login-container button:nth-child(2)');
XPath
ts
Copy code
page.locator('//button[text()="Login"]');
⚠️ Avoid if possible — fragile and hard to maintain.

Locator vs Element Handle (CRITICAL INTERVIEW POINT)
Locator (Preferred)
ts
Copy code
const button = page.getByRole('button', { name: 'Login' });
await button.click();
ElementHandle (Avoid)
ts
Copy code
const button = await page.$('button');
await button.click();
Why?

ElementHandle does not auto-retry

Breaks on DOM refresh

Chaining Locators
HTML
html
Copy code
<div class="card">
  <button>Delete</button>
</div>
Playwright
ts
Copy code
page.locator('.card').getByRole('button', { name: 'Delete' });
Chaining increases precision and stability.

Filtering Locators
ts
Copy code
page.getByRole('row').filter({ hasText: 'John' });
Used heavily in:

Tables

Lists

Grids

Assertions with Locators
ts
Copy code
const error = page.getByText('Invalid credentials');
await expect(error).toBeVisible();
Locators + expect = 🔥 stable assertions.

❌ Common Locator Anti-Patterns
❌ Dynamic IDs

ts
Copy code
page.locator('#btn_12345');
❌ Absolute XPath

ts
Copy code
/page/div[2]/div[3]/button
❌ Index-based selection

ts
Copy code
page.locator('button').nth(3);
✅ Best Practices (Senior Level)
✔ Prefer role-based locators
✔ Write locators like a user would see
✔ One locator per element
✔ Centralize locators in Page Objects
✔ Avoid XPath unless unavoidable

Real Automation Example (POM)
ts
Copy code
class LoginPage {
  loginButton = this.page.getByRole('button', { name: 'Login' });

  async login(email, password) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.loginButton.click();
  }
}
Interview-Ready Summary
Playwright locators are auto-waiting, retryable queries that focus on user-visible attributes like roles and text, making tests more stable and less flaky compared to traditional selectors.

