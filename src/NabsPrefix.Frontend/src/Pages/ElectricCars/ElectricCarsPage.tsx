import { Cards, Panel } from "@net-advantage/nabs-ui-shell";
import { ElectricCarsPageViewModel } from "./ElectricCarsPage.view-model";

const electricCarsPageViewModel = new ElectricCarsPageViewModel();

export function ElectricCarsPage() {
  const cards = electricCarsPageViewModel.electricCarModel.map((car) => ({
    id: car.id,
    header: car.type,
    content: (
      <ul>
        <li>Range: {car.rangeMiles} miles</li>
        <li>Battery: {car.batteryKWh} kWh</li>
        <li>Drive: {car.driveType}</li>
        <li>Charging: {car.chargeSpeed}</li>
      </ul>
    ),
    actions: car.description,
  }));

  return (
    <Panel header="Electric Cars">
      <p>{electricCarsPageViewModel.topicPrompt}</p>
      <Cards aria-label="Electric car card list" columns={2} layout="N" items={cards} />
    </Panel>
  );
}
