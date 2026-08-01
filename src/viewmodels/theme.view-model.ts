export class ThemeViewModel {
  private readonly lightThemeClass = "nabs-ui-theme-light";
  private readonly darkThemeClass = "nabs-ui-theme-dark";

  public isDarkTheme(root: Element): boolean {
    return root.classList.contains(this.darkThemeClass);
  }

  public toggleTheme(root: Element): string {
    const isDark = this.isDarkTheme(root);
    root.classList.remove(this.lightThemeClass, this.darkThemeClass);

    const nextThemeClass = isDark ? this.lightThemeClass : this.darkThemeClass;
    root.classList.add(nextThemeClass);

    return nextThemeClass;
  }
}
