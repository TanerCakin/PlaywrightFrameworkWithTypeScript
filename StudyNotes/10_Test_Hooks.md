# Test Hooks

## Hooks
- beforeEach
- afterEach

## Example
```ts
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});
```
