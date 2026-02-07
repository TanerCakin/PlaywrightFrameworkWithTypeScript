✅ What is a Promise?
A Promise is a special JavaScript object that represents a value that will be available in the future.
// Promise = a value that will complete in the future (used for async operations)

➡️ “I promise I will give you the result… but not right now.”

📌 Why Playwright Uses Promises?
Every Playwright method takes time.

📌 How to use a Promise?
✔ Method 1: async/await (Playwright uses this!)
const result = await p;
console.log(result); // "Done!"
✔ Method 2: .then()
p.then(res => console.log(res));

📌 Simple Example of a Promise
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done!");
  }, 1000);
});

📘 QA-Friendly Summary
A Promise = something that will finish later
It is used for async operations
Playwright commands return Promises
You MUST use await so the test waits
Without await, commands run too fast and fail