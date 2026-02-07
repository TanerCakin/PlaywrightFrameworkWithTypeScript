# test & expect (Playwright)

## Definition
`test` and `expect` are the **core building blocks** of Playwright testing.

- `test` → defines **what to test**
- `expect` → defines **what to verify**

They come from the built-in Playwright test runner:
```ts
import { test, expect } from '@playwright/test';
What is test?
Definition
test defines a single executable test case.
Each test represents one user scenario or one validation.

Syntax
ts
Copy code
test('test name', async ({ page }) => {
  // test steps
});
Anatomy of a test
ts
Copy code
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.fill('#password', '123456');
  await page.click('button[type=submit]');
});
Explanation
'user can login' → test title (human readable)

async → test contains async browser actions

{ page } → Playwright fixture

await → waits for browser action to complete

What is a Fixture in test?
Definition
Fixtures are predefined objects injected into tests.

Common built-in fixtures:

page → browser tab

browser → browser instance

context → isolated session

Example:

ts
Copy code
test('example', async ({ page }) => {
  await page.goto('/');
});
What is expect?
Definition
expect is Playwright’s assertion library.
It verifies that the application behaves as expected.

Playwright assertions are:

Auto-waiting

Retryable

Stable

Basic expect Example
ts
Copy code
await expect(page.locator('h1')).toBeVisible();
What happens internally?
Playwright will:

Retry the assertion

Wait until condition is met

Fail only after timeout

❌ No manual waits needed

Common Assertions (VERY IMPORTANT)
Visibility
ts
Copy code
await expect(locator).toBeVisible();
Text
ts
Copy code
await expect(locator).toHaveText('Welcome');
Partial Text / Regex
ts
Copy code
await expect(locator).toContainText('Welcome');
await expect(locator).toHaveText(/welcome/i);
URL
ts
Copy code
await expect(page).toHaveURL('/dashboard');
await expect(page).toHaveURL(/dashboard/);
Auto-Waiting Behavior (Key Difference from Selenium)
❌ Selenium:

java
Copy code
Thread.sleep(5000);
✅ Playwright:

ts
Copy code
await expect(locator).toBeVisible();
Playwright waits automatically until:

Element exists

Element is visible

Condition passes

Correct vs Wrong Usage
❌ WRONG (Flaky)
ts
Copy code
await page.click('#submit');
await page.waitForTimeout(3000);
await expect(page.locator('#success')).toBeVisible();
✅ CORRECT (Stable)
ts
Copy code
await page.click('#submit');
await expect(page.locator('#success')).toBeVisible();
Grouping Tests with test.describe
Definition
test.describe groups related tests.

ts
Copy code
test.describe('Login tests', () => {
  test('valid login', async ({ page }) => {});
  test('invalid login', async ({ page }) => {});
});
Why use it?
Better readability

Better reports

Logical grouping

Focused Tests (test.only)
Purpose
Run only one test during development.

ts
Copy code
test.only('debug this test', async ({ page }) => {});
⚠️ CI fails if test.only exists.

Skipping Tests
ts
Copy code
test.skip('feature not ready', async ({ page }) => {});
Or conditionally:

ts
Copy code
test.skip(process.env.CI, 'skip on CI');
Timeouts in Tests
Default timeout
Test: 30 seconds

Assertion: 5 seconds

Custom timeout
ts
Copy code
test('slow test', async ({ page }) => {}, { timeout: 60000 });
Retries
Retries are configured in playwright.config.ts:

ts
Copy code
retries: process.env.CI ? 2 : 0,
Playwright retries entire test, not steps.