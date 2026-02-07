# 🎯 Playwright CLI Commands Cheat Sheet

A complete list of useful Playwright CLI commands with short explanations and usage examples.

---

## 🚀 Run Tests

### **Run all tests**
```bash
npx playwright test
```
Runs every test in your project.

---

### **Run a specific test file**
```bash
npx playwright test tests/login.spec.ts
```
Runs only the tests inside the specified file.

---

### **Run a specific test by name**
```bash
npx playwright test -g "login"
```
Runs tests whose title contains **"login"**.

---

### **Run tests matching a regex**
```bash
npx playwright test -g "/search/i"
```
Runs tests matching the regex pattern.

---

## 🌐 Browser Selection

### **Chromium**
```bash
npx playwright test --project=chromium
```
Runs tests in Chromium browser.

---

### **Firefox**
```bash
npx playwright test --project=firefox
```
Runs tests in Firefox browser.

---

### **WebKit**
```bash
npx playwright test --project=webkit
```
Runs tests in the Safari engine.

---

### **Run in headed mode**
```bash
npx playwright test --headed
```
Opens the browser UI during execution.

---

## 🧭 Debugging

### **Debug mode**
```bash
npx playwright test --debug
```
Starts Playwright Inspector.

---

### **Slow motion**
```bash
npx playwright test --slow-mo=500
```
Slows each action by 500ms.

---

### **UI Mode**
```bash
npx playwright test --ui
```
Opens the interactive UI test explorer.

---

### **Pause (inside test)**
```ts
await page.pause();
```
Pauses execution and opens Inspector.

---

## 🔍 Filtering & Grouping

### **Run tests with a keyword**
```bash
npx playwright test -g "@smoke"
```

### **Exclude tests**
```bash
npx playwright test --grep-invert "login"
```

### **Run failed tests only**
```bash
npx playwright test --last-failed
```

---

## 🔁 Repeat & Retry

### **Repeat a test**
```bash
npx playwright test --repeat-each=5
```

---

## 🛠 Utilities

### **Codegen (auto-generate tests)**
```bash
npx playwright codegen https://example.com
```

### **Install browsers**
```bash
npx playwright install
```

### **Install specific browser**
```bash
npx playwright install chromium
```

### **Show report**
```bash
npx playwright show-report
```

### **Show trace**
```bash
npx playwright show-trace trace.zip
```

---

## 🎉 End of Cheat Sheet
Feel free to include this `.md` file in your project documentation.
