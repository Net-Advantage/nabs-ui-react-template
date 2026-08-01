import {
  Shell,
  Branding,
  Navigation,
  Button,
  Panel,
} from "@net-advantage/nabs-ui-shell";
import { ThemeViewModel } from "./viewmodels/theme.view-model";

const navItems = [
  { id: "home", label: "Home" },
  { id: "items", label: "Items" },
  { id: "settings", label: "Settings" },
];

function ThemeToggle() {
  const themeViewModel = new ThemeViewModel();

  const toggle = () => {
    const root = document.documentElement;
    themeViewModel.toggleTheme(root);
  };

  return <Button onClick={toggle}>Toggle theme</Button>;
}

export default function App() {
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
          <ThemeToggle />
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