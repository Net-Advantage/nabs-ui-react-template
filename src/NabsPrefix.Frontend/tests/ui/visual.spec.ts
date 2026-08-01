import { expect, test } from "@playwright/test";

test.describe("Visual regression", () => {
  test("home page dark theme baseline", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("home-dark.png", {
      fullPage: true,
    });
  });

  test("home page light theme baseline", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Toggle theme" }).click();

    await expect(page).toHaveScreenshot("home-light.png", {
      fullPage: true,
    });
  });
});
