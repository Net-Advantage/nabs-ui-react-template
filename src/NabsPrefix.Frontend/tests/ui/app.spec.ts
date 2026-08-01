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

test("navigation opens Weather page and renders forecast cards from API", async ({ page }) => {
  await page.route("**/api/weather", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { date: "2026-08-01", temperatureC: 18, temperatureF: 64, summary: "Cool" },
        { date: "2026-08-02", temperatureC: 21, temperatureF: 70, summary: "Mild" },
        { date: "2026-08-03", temperatureC: 24, temperatureF: 75, summary: "Warm" },
        { date: "2026-08-04", temperatureC: 27, temperatureF: 81, summary: "Hot" },
      ]),
    });
  });

  await page.goto("/");

  await page.getByRole("button", { name: "Weather" }).click();

  await expect(page.getByText("Weather").first()).toBeVisible();
  await expect(page.getByText("Live 5-day weather forecast from the Weather API.")).toBeVisible();

  const cardItems = page.getByRole("region", { name: "Weather forecast card list" }).getByRole("article");
  await expect(cardItems).toHaveCount(4);

  await expect(page.getByText("Summary: Cool")).toBeVisible();
  await expect(page.getByText("Summary: Hot")).toBeVisible();
});
