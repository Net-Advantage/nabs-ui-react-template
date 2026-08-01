import {
  Shell,
  Branding,
  Navigation,
  Button,
} from "@net-advantage/nabs-ui-shell";
import { useMemo, useState } from "react";
import { ThemeViewModel } from "./viewmodels/theme.view-model";
import { HomePage } from "./Pages/Home/HomePage";
import { ElectricCarsPage } from "./Pages/ElectricCars/ElectricCarsPage";
import { SettingsPage } from "./Pages/Settings/SettingsPage";

const navItems = [
  { id: "home", label: "Home" },
  { id: "electric-cars", label: "Electric Cars" },
  { id: "settings", label: "Settings" },
];

type AppPageId = (typeof navItems)[number]["id"];

function ThemeToggle() {
  const themeViewModel = new ThemeViewModel();

  const toggle = () => {
    const root = document.documentElement;
    themeViewModel.toggleTheme(root);
  };

  return <Button onClick={toggle}>Toggle theme</Button>;
}

export default function App() {
  const [activePageId, setActivePageId] = useState<AppPageId>("home");

  const activePage = useMemo(() => {
    if (activePageId === "electric-cars") {
      return <ElectricCarsPage />;
    }

    if (activePageId === "settings") {
      return <SettingsPage />;
    }

    return <HomePage />;
  }, [activePageId]);

  return (
    <Shell
      header={
        <Branding
          logo={
            <span
              className="app-logo-bg"
              aria-label="Nabs logo"
              role="img"
              style={{ width: "32px", height: "32px", display: "inline-block" }}
            />
          }
          title="Nabs UI App"
          byline="React starter template"
        />
      }
      navigation={
        <Navigation
          direction="vertical"
          textAlignment="left"
          activeItemId={activePageId}
          items={navItems}
          onItemSelect={(id: string) => setActivePageId(id as AppPageId)}
        />
      }
      footer={
        <div
          style={{
            padding: "0.5rem 1.25rem",
            fontSize: "0.875rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>© {new Date().getFullYear()} Your Company</span>
          <ThemeToggle />
        </div>
      }
    >
      {activePage}
    </Shell>
  );
}