# Playwright -- Short Notes (QA Automation, JavaScript)

## 📌 What is Playwright?

Playwright is a **modern end‑to-end (E2E) test automation framework**
developed by **Microsoft** for testing **web applications** across
modern browsers.\
It provides **reliable, fast, and auto‑waiting** automation with support
for **Chromium, WebKit, Firefox**, and **real mobile emulation**.

------------------------------------------------------------------------

## 📌 Why Playwright?

-   Built for **modern web apps** (SPAs, React/Angular/Vue)
-   **Auto‑waits** for elements → fewer flaky tests
-   Supports **JS, TS, Python, Java, .NET**
-   **Parallel execution** built‑in
-   **BrowserContext isolation** (like fresh incognito profile)
-   Excellent **debugging tools**
-   Powerful **network mocking**, **tracing**, **video**,
    **screenshots**

------------------------------------------------------------------------

## 📌 Where to Use Playwright?

Use Playwright for: - **E2E UI testing** - **Cross‑browser /
cross‑platform QA** - **Regression testing** - **API testing** -
**Mobile device emulation** - **CI/CD automation** (GitHub Actions,
Azure, Jenkins)

------------------------------------------------------------------------

## 📌 Playwright vs Selenium -- Quick Comparison

  -----------------------------------------------------------------------
  Feature            Playwright                   Selenium
  ------------------ ---------------------------- -----------------------
  **Speed**          Faster (single API driver)   Slower (uses WebDriver)

  **Auto‑waiting**   ✔ Yes (built‑in)             ✖ No (needs explicit
                                                  waits)

  **Parallel         Native                       Requires
  execution**                                     TestNG/JUnit/etc.

  **Modern web       Excellent                    Good but outdated in
  support**                                       some cases

  **Network          ✔ Built‑in                   Requires plugins
  mocking**                                       

  **BrowserContext   ✔ Yes                        ✖ No
  isolation**                                     

  **Installation**   Simple                       Needs drivers

  **Languages**      JS, TS, Python, Java, .NET   Many

  **Mobile devices** Real device emulation        Appium integration
                                                  needed
  -----------------------------------------------------------------------

**Verdict**: Selenium = mature, broad; Playwright = modern, faster, less
flaky.

------------------------------------------------------------------------

## 📌 Playwright Core Features

-   **Auto‑wait for elements**
-   **Trace viewer**
-   **Parallel execution**
-   **Screen recording & screenshots**
-   **API testing**
-   **Fixtures & Hooks**
-   **Network interception / mocking**
-   **BrowserContext (user session isolation)**
-   **Emulation:** geolocation, timezone, permissions, device, viewport

------------------------------------------------------------------------

## 📌 Installation (JavaScript)

``` bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

------------------------------------------------------------------------

## 📌 Basic Project Structure

    project/
     ├─ tests/
     │   └─ example.spec.js
     ├─ playwright.config.js
     └─ package.json

------------------------------------------------------------------------

## 📌 Example Test (JS)

``` js
const { test, expect } = require('@playwright/test');

test('homepage test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);

  const link = page.getByRole('link', { name: 'Get started' });
  await link.click();

  await expect(page).toHaveURL(/.*docs/);
});
```

------------------------------------------------------------------------

## 📌 Playwright Methods & Classes (Quick Notes)

### **Browser**

Represents the browser (Chromium, Firefox, WebKit)

``` js
const browser = await playwright.chromium.launch({ headless: false });
```

### **BrowserContext**

Isolated session (cookies, storage)

``` js
const context = await browser.newContext();
```

### **Page**

Equivalent to a browser tab

``` js
const page = await context.newPage();
await page.goto('https://example.com');
```

------------------------------------------------------------------------

## 📌 Locator Methods

``` js
page.getByText('Login');
page.getByRole('button', { name: 'Submit' });
page.locator('#username');
page.getByTestId('user-card');
```

------------------------------------------------------------------------

## 📌 Page Interaction Methods

``` js
await page.click('button');
await page.fill('#email', 'test@test.com');
await page.type('#password', 'secret');
await page.check('#accept');
await page.selectOption('#country', 'IN');
await page.hover('.menu');
await page.screenshot({ path: 'pic.png' });
```

------------------------------------------------------------------------

## 📌 Assertions

``` js
await expect(page).toHaveURL(/dashboard/);
await expect(page.locator('.title')).toHaveText('Welcome');
await expect(page.locator('table tr')).toHaveCount(5);
```

------------------------------------------------------------------------

## 📌 Hooks

``` js
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});
```

------------------------------------------------------------------------

## 📌 Fixtures (Reusable Login Example)

``` js
const base = require('@playwright/test');

exports.test = base.test.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', 'qa@test.com');
    await page.fill('#password', '123456');
    await page.click('button[type=submit]');
    await use(page);
  }
});
```

Usage:

``` js
const { test, expect } = require('../fixtures');

test('Dashboard test', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Dashboard')).toBeVisible();
});
```

------------------------------------------------------------------------

## 📌 Storage State (Login Once, Reuse Session)

### Create storage:

``` js
await page.context().storageState({ path: 'state.json' });
```

### Use in config:

``` js
use: { storageState: 'state.json' }
```

------------------------------------------------------------------------

## 📌 API Testing

``` js
test('GET user', async ({ request }) => {
  const res = await request.get('/api/user/1');
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  expect(data.id).toBe(1);
});
```

------------------------------------------------------------------------

## 📌 Network Mocking Example

``` js
await page.route('**/api/items', route =>
  route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 1, name: 'Mock Item' }])
  })
);
```

------------------------------------------------------------------------

## 📌 Debugging

``` bash
PWDEBUG=1 npx playwright test
```

or inside test:

``` js
await page.pause();
```

------------------------------------------------------------------------

## 📌 Traces & Artifacts

Config:

``` js
use: {
  trace: 'on',
  video: 'retain-on-failure',
  screenshot: 'only-on-failure'
}
```

------------------------------------------------------------------------

## 📌 File Upload / Download

### Upload:

``` js
await page.setInputFiles('input[type="file"]', 'sample.pdf');
```

### Download:

``` js
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('#export')
]);

await download.saveAs('report.pdf');
```

------------------------------------------------------------------------

## 📌 When to Choose Playwright

Choose Playwright when: - You need **fast, stable, cross‑browser
tests** - Testing modern SPAs with heavy DOM updates - Need
**parallelism**, **network mocking**, **trace viewer**, **auto‑wait**

Choose Selenium when: - You need **wider language support** for legacy
setups - Testing **desktop apps + web** with Selenium/Appium ecosystem

------------------------------------------------------------------------

## 📌 Summary

Playwright is a **modern, stable, and powerful** testing framework
with: - Auto‑wait - Fast execution - Cross‑browser support - Mocking,
tracing, parallelism - Better reliability than Selenium in most web
testing cases

Perfect for **QA teams**, **E2E testing**, **regression**, and **CI/CD
automation**.
