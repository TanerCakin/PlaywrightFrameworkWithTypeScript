➡️ Installing Playwright -> 
npm init playwright@latest

➡️ Check version ->
npx playwright --version

➡️ What's Installed;
Playwright downloads required browser binaries and creates the scaffold below.

playwright.config.ts         # Test configuration
package.json
package-lock.json            # Or yarn.lock / pnpm-lock.yaml
tests/
  example.spec.ts            # Minimal example test

➡️ Running the Example Test -> 
npx playwright test
By default headless browser

➡️ Now will run as headed
npx playwright test --headed

➡️ To run specific test
npx playwright test homepage/test1.spec.ts 

➡️ Set the browser ->
npx playwright test homepage/appUrl.spec.ts --project=chromium
npx playwright test --project=chromium

➡️ Opens a visual UI panel
npx playwright test --ui  

➡️-g = grep = filter tests by name->
npx playwright test -g "login"

➡️ Open in debug mode
This pauses tests and opens the inspector.
npx playwright test --ui --debug

npx playwright install
➡️
npm install playwright --save-dev
npm install @playwright/test --save-dev
npm install typescript --save-dev
npx tsc --init
➡️
# run:
npx playwright test --headed

npx tsc --init -> config file

Playwright Test Runner -> Extension


https://tutorialsninja.com/demo/index.php?route=account/login

qatester1987@gmail.com
pswd123