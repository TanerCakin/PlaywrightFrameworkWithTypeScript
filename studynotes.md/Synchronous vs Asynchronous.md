✅ Synchronous vs Asynchronous in Playwright
➡️Playwright is built on Node.js, and all Playwright actions are asynchronous.
➡️This means Playwright operations do not happen instantly — they return a Promise and must be awaited.

➡️Synchronous = step-by-step execution
➡️Asynchronous = operations happen in background and must be awaited
➡️Playwright methods are asynchronous → always use 'await page.click()', 'await page.goto()', etc.
➡️ Whenever you are dealing with background job use sycn nature.
