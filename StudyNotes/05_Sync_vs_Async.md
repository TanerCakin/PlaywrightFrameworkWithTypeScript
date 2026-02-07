# Sync vs Async (JavaScript & Playwright)

## Definition
In JavaScript (and Playwright), **almost everything is asynchronous**.

- **Synchronous (sync)** code blocks execution until it finishes
- **Asynchronous (async)** code runs in the background and completes later

👉 Playwright relies on **async behavior** because browsers, networks, and UI rendering are asynchronous.

---

## Why This Matters in Playwright Automation

If you don’t understand async:
- Tests may pass sometimes ❌
- Tests may fail randomly ❌
- Actions may run out of order ❌

Understanding async is **mandatory** for stable Playwright tests.

---

## Synchronous Code (Concept)

### Definition
Synchronous code executes **line by line**, blocking the next line until it finishes.

### Example (Sync)
```js
const sum = 1 + 2;
console.log(sum);
Execution waits

Order is guaranteed

No waiting needed

Asynchronous Code (Concept)
Definition
Asynchronous code starts an operation and does not wait for it to finish unless explicitly told to.

Examples of async operations:

Network requests

Browser navigation

Clicking elements

Waiting for UI changes

The Role of async and await
async
Marks a function as asynchronous and allows the use of await.

ts
Copy code
async function login() {}
await
Pauses execution inside the async function until the Promise resolves.

ts
Copy code
await page.goto('/login');
Why Playwright APIs Are Async
Example
ts
Copy code
await page.click('#submit');
Why async?

Browser needs time to process the click

UI updates after the click

Network calls may happen

Playwright returns a Promise for these actions.

❌ WRONG: Async Without Await (COMMON MISTAKE)
ts
Copy code
page.goto('/login');
page.fill('#email', 'a@b.com');
page.click('#submit');
What happens?
All commands fire at once

No waiting

Race conditions

Flaky tests

✅ CORRECT: Async With Await
ts
Copy code
await page.goto('/login');
await page.fill('#email', 'a@b.com');
await page.click('#submit');
Execution is:

Go to page

Wait for page load

Fill email

Click submit

Visual Execution Flow
Without await
csharp
Copy code
goto()  fill()  click()
 |        |        |
(all fired immediately)
With await
scss
Copy code
goto() -> fill() -> click()
(wait)    (wait)    (wait)
Async in Playwright Tests
Test Function Itself Is Async
ts
Copy code
test('login test', async ({ page }) => {
  await page.goto('/login');
});
Why?

Because browser actions return Promises

Async in Page Object Model (POM)
ts
Copy code
class LoginPage {
  async login(email, password) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
  }
}
👉 Every method that performs browser actions must be async.

Mixing Sync & Async (SAFE WAY)
This is OK
ts
Copy code
const email = 'user@test.com'; // sync
await page.fill('#email', email); // async
❌ Common Async Anti-Patterns
1️⃣ Forgetting await
ts
Copy code
page.click('#submit');
await expect(page.getByText('Success')).toBeVisible();
May fail because click didn’t finish.

2️⃣ Using async inside loops incorrectly
ts
Copy code
items.forEach(async item => {
  await page.click(item);
});
❌ forEach does not wait.

✅ Correct loop
ts
Copy code
for (const item of items) {
  await page.click(item);
}
Async & Auto Waiting (How They Work Together)
async/await → controls execution order

Auto waiting → ensures UI readiness

Both are required for stable automation.

Synchronous (sync) vs Asynchronous (async)
1️⃣ Synchronous (sync)
Definition

Synchronous code runs line by line.
Each step blocks the next one until it finishes.

Think of it as:

“Do this → finish → then do the next thing”

Simple JS Example (Sync)
const a = 5;
const b = 10;
const sum = a + b;
console.log(sum);


Execution order:

a = 5

b = 10

sum = 15

print result

✔ Order is guaranteed
✔ Nothing runs in parallel
✔ No waiting needed

Sync in Automation?

👉 Almost never used for browser actions.

Why?

Browsers

UI rendering

Network calls

All of these take time → cannot be sync.

2️⃣ Asynchronous (async)
Definition

Asynchronous code does NOT block execution.
It starts an operation and finishes later.

Think of it as:

“Start this → come back when it’s done”

Simple JS Example (Async)
setTimeout(() => {
  console.log('Done');
}, 2000);

console.log('Start');


Output:

Start
Done   (after 2 seconds)


✔ Code continues running
✔ Result arrives later

3️⃣ Why Playwright Is Asynchronous

Browser actions are async because:

Page loading takes time

Elements appear later

Network calls happen in background

Animations delay UI

So Playwright methods return Promises.

page.goto('/login'); // async operation

Interview-Ready Summary
JavaScript async behavior allows Playwright to handle real browser operations. Using async and await correctly ensures actions execute in order and prevents race conditions and flaky tests.

