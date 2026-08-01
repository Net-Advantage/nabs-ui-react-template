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

test("navigation opens Electric Cars page and renders four cards", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Electric Cars" }).click();

  await expect(page.getByText("Electric Cars").first()).toBeVisible();
  await expect(page.getByText("Different types of electric cars and their specs.")).toBeVisible();

  const cardItems = page.getByRole("region", { name: "Electric car card list" }).getByRole("article");
  await expect(cardItems).toHaveCount(4);

  await expect(page.getByText("Compact Hatchback EV")).toBeVisible();
  await expect(page.getByText("Performance Crossover EV")).toBeVisible();
});
