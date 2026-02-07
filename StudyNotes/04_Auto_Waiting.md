# Auto Waiting (Playwright)

## Definition
Auto waiting is Playwright’s built-in ability to **automatically wait** for the application to be in the **correct state** before performing an action or assertion.

Playwright waits for:
- Elements to appear in the DOM
- Elements to be visible
- Elements to be enabled
- Elements to be stable (not moving)
- Network activity to settle (when needed)

👉 This is the **#1 reason Playwright tests are stable**.

---

## Why Auto Waiting Exists

### The core problem in UI automation
Web applications are:
- Asynchronous
- Dynamic
- Network-dependent

Without auto waiting:
- Tests run faster than the UI
- Elements are not ready
- Tests become flaky

---

## How Playwright Auto Waiting Works (Internally)

When you perform an action like:
```ts
await page.click('#submit');
Playwright automatically waits until:

Element exists in DOM

Element is visible

Element is enabled

Element is not covered

Element is stable (no animation)

Only then does it click.

Auto Waiting in Actions
Example
ts
Copy code
await page.fill('#email', 'user@test.com');
await page.click('button[type=submit]');
No explicit waits are required.

Auto Waiting in Assertions (CRITICAL)
Example
ts
Copy code
await expect(page.getByText('Welcome')).toBeVisible();
Playwright will:

Retry the assertion

Poll the DOM

Wait until condition passes

Fail only after timeout

Comparison with Selenium
❌ Selenium
java
Copy code
Thread.sleep(5000);
driver.findElement(By.id("submit")).click();
✅ Playwright
ts
Copy code
await page.click('#submit');
No sleeps. No guesswork.

Auto Waiting vs Explicit Waiting
❌ Explicit wait (Anti-pattern)
ts
Copy code
await page.waitForTimeout(3000);
Why bad?

Wastes time

Still flaky

Environment-dependent

✅ Auto wait (Best practice)
ts
Copy code
await expect(page.locator('#success')).toBeVisible();
What Playwright Does NOT Auto-Wait For
⚠️ Important interview question

Playwright does NOT auto-wait for:

Arbitrary time delays

Background jobs

WebSocket events

Custom business logic

You must wait intentionally for those.

Valid Explicit Waits (When Needed)
1️⃣ waitForURL
ts
Copy code
await page.waitForURL('/dashboard');
2️⃣ waitForResponse
ts
Copy code
await page.waitForResponse(resp => resp.url().includes('/api/login'));
3️⃣ waitForLoadState
ts
Copy code
await page.waitForLoadState('networkidle');
These are event-based, not time-based.

Auto Waiting with Locators
ts
Copy code
const button = page.getByRole('button', { name: 'Save' });
await button.click();
The locator itself waits until the element is usable.

Flaky Test Example (WRONG)
ts
Copy code
await page.click('#submit');
await page.waitForTimeout(2000);
await expect(page.locator('#success')).toBeVisible();
Why flaky?

UI might need more or less than 2s

Stable Test Example (CORRECT)
ts
Copy code
await page.click('#submit');
await expect(page.locator('#success')).toBeVisible();
Timeouts and Auto Waiting
Default timeouts
Action timeout: 30s

Assertion timeout: 5s

Override timeout (rarely needed)
ts
Copy code
await expect(locator).toBeVisible({ timeout: 10000 });
Best Practices (Senior Level)
✔ Never use waitForTimeout
✔ Let actions + assertions do the waiting
✔ Wait for events, not time
✔ Prefer expect over manual waits
✔ Investigate WHY waiting is needed

Real-World Automation Scenario
Login flow
ts
Copy code
await page.click('button[type=submit]');
await expect(page).toHaveURL('/dashboard');
await expect(page.getByText('Welcome')).toBeVisible();
This test:

Waits for navigation

Waits for UI update

Is stable across environments

Interview-Ready Summary
Playwright’s auto waiting ensures that actions and assertions only run when the application is ready, eliminating the need for hard waits and significantly reducing flaky tests.