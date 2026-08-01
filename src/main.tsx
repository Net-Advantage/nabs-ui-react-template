import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Nabs UI required styles (order is important)
import "@net-advantage/nabs-ui-themes/style.css";
import "@net-advantage/nabs-ui-themes-light/style.css";
import "@net-advantage/nabs-ui-themes-dark/style.css";
import "@net-advantage/nabs-ui-shell/style.css";

import App from "./App.tsx";

// Default theme and density
document.documentElement.classList.add(
  "nabs-ui-theme-dark",
  "nabs-ui-density-compact"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);