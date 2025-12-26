import{test,expect} from "@playwright/test";

test("Verify app url", async ({ page }) => {
  await page.goto("http://www.automationpractice.pl/index.php");

  let url: string = await page.url();
  console.log("Title:", url);

  await expect(page).toHaveURL(/automationpractice/); 
});