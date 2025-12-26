# Playwright Regex Tools (with Examples)

| Symbol  | Meaning            | Regex Example         | Playwright Example                          |
|---------|--------------------|------------------------|----------------------------------------------|
| `.`     | any character      | `/page./`             | `expect(page).toHaveURL(/page./)`            |
| `.*`    | any characters     | `/product.*/`         | `expect(page).toHaveURL(/product.*/)`        |
| `+`     | one or more        | `/\d+/`               | `expect(page).toHaveURL(/product\/\d+/)`     |
| `?`     | optional           | `/login\/?/`          | `expect(page).toHaveURL(/login\/?/)`         |
| `\d`    | digit              | `/\d\d/`              | `expect(locator).toHaveText(/\d+/)`          |
| `\w`    | word char          | `/\w+/`               | `expect(page).toHaveURL(/user_\w+/)`         |
| `\s`    | whitespace         | `/\s+/`               | `expect(locator).toHaveText(/total\s+price/)`|
| `[...]` | allowed characters | `/[abc]/`             | `expect(page).toHaveURL(/[abc]\/page/)`      |
| `[^...]`| negated set        | `/[^a-z]/`            | `expect(locator).toHaveText(/[^a-z]/i)`      |
| `(...)` | group / OR         | `/(login\|logout)/`   | `expect(page).toHaveURL(/(login\|logout)/)`  |
| `^`     | start of string    | `/^https/`            | `expect(page).toHaveURL(/^https/)`           |
| `$`     | end of string      | `/index\.php$/`       | `expect(page).toHaveURL(/index\.php$/)`      |
| `\b`    | word boundary      | `/\bshop\b/`          | `expect(locator).toHaveText(/\bshop\b/)`     |
