# Browser vs Context vs Page

## Browser
Entire browser

## Context
Isolated session

## Page
Single tab

## Example
```ts
const context = await browser.newContext();
const page = await context.newPage();
```
