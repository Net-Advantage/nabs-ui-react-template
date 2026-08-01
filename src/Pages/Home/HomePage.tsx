import { Panel } from "@net-advantage/nabs-ui-shell";

export function HomePage() {
  return (
    <Panel header="Welcome">
      <p>
        This is a clean Nabs UI starter. The Shell is the root layout and the
        official light/dark themes are already wired up.
      </p>
      <p>
        Build all new UI using components imported from <code>@net-advantage/nabs-ui-shell</code>.
      </p>
    </Panel>
  );
}
