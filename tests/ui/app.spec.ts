import { test, expect } from "@playwright/test";

test("app shell renders and theme toggle changes root class", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Nabs UI App")).toBeVisible();
  await expect(page.getByText("React starter template")).toBeVisible();

  const html = page.locator("html");
  await expect(html).toHaveClass(/nabs-ui-theme-dark/);

  await page.getByRole("button", { name: "Toggle theme" }).click();

  await expect(html).toHaveClass(/nabs-ui-theme-light/);
});
