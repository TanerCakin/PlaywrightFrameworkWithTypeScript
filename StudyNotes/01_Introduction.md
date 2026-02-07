# Playwright Introduction

## Definition
Playwright is a **modern end-to-end (E2E) test automation framework** used to test web applications.
It allows you to automate **real user behavior** in real browsers.

Playwright is developed and maintained by **Microsoft**.

---

## What is End-to-End (E2E) Testing?
End-to-End testing verifies:
- The **entire user flow**
- From UI → Backend → Database → UI
- In a way that mimics a real user

### Example E2E Flow
1. User opens login page
2. User enters credentials
3. User logs in
4. Dashboard loads
5. User logs out

Playwright is built specifically for this type of testing.

---

## Why Playwright Exists (Problem It Solves)

### Problems with older tools (e.g., Selenium):
- Manual waits (`Thread.sleep`)
- Flaky tests
- Slow execution
- Complex setup
- Poor debugging

### Playwright solves this by:
- Automatic waiting
- Smart retries
- Fast browser communication
- Built-in debugging tools

---

## Supported Browsers
Playwright supports **real browser engines**, not simulations:

- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari engine)

👉 Same test runs on all browsers **without changes**.

---

## Languages Supported
Playwright supports:
- TypeScript / JavaScript (most common)
- Python
- Java
- C#

This course / notes assume **TypeScript**, which is the industry standard.

---

## Core Capabilities of Playwright

### 1. Auto Waiting (MOST IMPORTANT)
Playwright automatically waits for:
- Elements to appear
- Elements to be visible
- Elements to be clickable
- Network requests to finish

❌ No `sleep()`  
❌ No manual polling

---

### 2. Modern Locators
Playwright uses **user-focused locators**:
- getByRole
- getByText
- getByLabel

These are:
- Stable
- Readable
- Accessible

---

### 3. Parallel Execution
Tests can run:
- In parallel
- Across browsers
- Across environments

This makes Playwright **very fast** in CI/CD.

---

### 4. Built-in Test Runner
Playwright includes:
- Test runner
- Assertions
- Retries
- Reporting
- Tracing
- Screenshots & videos

❌ No need for Jest / Mocha separately

---

## Simple Playwright Test Example

```ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toBeVisible();
});
