✅ What is Fixture?
It is nothing but a global variable which is access through the project.
A fixture in Playwright is a reusable, preconfigured test setup resource that Playwright automatically creates before a test and cleans up afterward.
📘 Shared setup code for tests
📘 Automatically created, managed, and disposed by Playwright
📘 Helps avoid repeating code like login, page creation, API setup, test data, etc.

➡️Playwright already provides fixtures like:
browser
context
page
request
browserName
...........................................................

// do not add all assertions in one test, not best practice
//✔ "Should <expected behavior> when <condition>"