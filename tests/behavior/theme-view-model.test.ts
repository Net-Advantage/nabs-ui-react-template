import { describe, expect, test } from "vitest";
import { ThemeViewModel } from "../../src/viewmodels/theme.view-model";

describe("ThemeViewModel", () => {
  test("detects dark mode", () => {
    const root = document.createElement("div");
    root.classList.add("nabs-ui-theme-dark");

    const viewModel = new ThemeViewModel();

    expect(viewModel.isDarkTheme(root)).toBe(true);
  });

  test("toggles dark mode to light mode", () => {
    const root = document.createElement("div");
    root.classList.add("nabs-ui-theme-dark");

    const viewModel = new ThemeViewModel();
    const nextTheme = viewModel.toggleTheme(root);

    expect(nextTheme).toBe("nabs-ui-theme-light");
    expect(root.classList.contains("nabs-ui-theme-light")).toBe(true);
    expect(root.classList.contains("nabs-ui-theme-dark")).toBe(false);
  });

  test("toggles light mode to dark mode", () => {
    const root = document.createElement("div");
    root.classList.add("nabs-ui-theme-light");

    const viewModel = new ThemeViewModel();
    const nextTheme = viewModel.toggleTheme(root);

    expect(nextTheme).toBe("nabs-ui-theme-dark");
    expect(root.classList.contains("nabs-ui-theme-dark")).toBe(true);
    expect(root.classList.contains("nabs-ui-theme-light")).toBe(false);
  });
});
