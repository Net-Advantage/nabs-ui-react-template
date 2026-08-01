import { useEffect, useState } from "react";
import {
  Shell,
  Branding,
  Navigation,
  Button,
  Panel,
} from "@net-advantage/nabs-ui-shell";
import nabsLogoLight from "./assets/net-advantage-logo-launch-light.svg";
import nabsLogoDark from "./assets/net-advantage-logo-launch-dark.svg";

const navItems = [
  { id: "home", label: "Home" },
  { id: "items", label: "Items" },
  { id: "settings", label: "Settings" },
];

type ThemeToggleProps = {
  onToggle?: () => void;
};

function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("nabs-ui-theme-dark");
    root.classList.remove("nabs-ui-theme-light", "nabs-ui-theme-dark");
    root.classList.add(isDark ? "nabs-ui-theme-light" : "nabs-ui-theme-dark");
    onToggle?.();
  };

  return <Button onClick={toggle}>Toggle theme</Button>;
}

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() =>
    document.documentElement.classList.contains("nabs-ui-theme-dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkTheme(root.classList.contains("nabs-ui-theme-dark"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <Shell
      header={
        <Branding
          logo={
            <img
              src={isDarkTheme ? nabsLogoDark : nabsLogoLight}
              alt=""
              width={32}
              height={32}
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
          activeItemId="home"
          items={navItems}
          onItemSelect={(id: string) => {
            // Replace with your router later
            console.log("navigate to", id);
          }}
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
          <ThemeToggle onToggle={() => setIsDarkTheme((current) => !current)} />
        </div>
      }
    >
      <Panel header="Welcome">
        <p>
          This is a clean Nabs UI starter. The Shell is the root layout and the
          official light/dark themes are already wired up.
        </p>
        <p>
          Build all new UI using components imported from{" "}
          <code>@net-advantage/nabs-ui-shell</code>.
        </p>
      </Panel>
    </Shell>
  );
}