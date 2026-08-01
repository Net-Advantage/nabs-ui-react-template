import { describe, expect, test } from "vitest";
import { ElectricCarsPageViewModel } from "../../src/Pages/ElectricCars/ElectricCarsPage.view-model";

describe("ElectricCarsPageViewModel", () => {
  test("provides a default topic prompt", () => {
    const viewModel = new ElectricCarsPageViewModel();

    expect(viewModel.topicPrompt).toContain("electric cars");
  });

  test("builds a four-card model for a topic", () => {
    const viewModel = new ElectricCarsPageViewModel();
    const model = viewModel.buildModelFromTopic("Electric cars and specs");

    expect(model).toHaveLength(4);

    for (const item of model) {
      expect(item.id.length).toBeGreaterThan(0);
      expect(item.type.length).toBeGreaterThan(0);
      expect(item.rangeMiles).toBeGreaterThan(0);
      expect(item.batteryKWh).toBeGreaterThan(0);
      expect(["FWD", "RWD", "AWD"]).toContain(item.driveType);
      expect(item.chargeSpeed.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
    }
  });

  test("exposes a prebuilt model from the default topic", () => {
    const viewModel = new ElectricCarsPageViewModel();

    expect(viewModel.electricCarModel).toHaveLength(4);
  });
});
