export interface ElectricCarModel {
  id: string;
  type: string;
  rangeMiles: number;
  batteryKWh: number;
  driveType: "FWD" | "RWD" | "AWD";
  chargeSpeed: string;
  description: string;
}

export class ElectricCarsPageViewModel {
  public readonly topicPrompt =
    "Different types of electric cars and their specs. Show range, battery, drive type, and charging profile.";

  public readonly electricCarModel: ElectricCarModel[] =
    this.buildElectricCarModel(this.topicPrompt);

  public buildModelFromTopic(topicPrompt: string): ElectricCarModel[] {
    return this.buildElectricCarModel(topicPrompt);
  }

  private buildElectricCarModel(_topicPrompt: string): ElectricCarModel[] {
    return [
      {
        id: "compact-hatchback",
        type: "Compact Hatchback EV",
        rangeMiles: 245,
        batteryKWh: 58,
        driveType: "FWD",
        chargeSpeed: "10% to 80% in 29 min (DC fast)",
        description: "City-friendly footprint with practical cargo space.",
      },
      {
        id: "family-sedan",
        type: "Family Sedan EV",
        rangeMiles: 325,
        batteryKWh: 77,
        driveType: "RWD",
        chargeSpeed: "10% to 80% in 31 min (DC fast)",
        description: "Balanced comfort and long range for daily commuting.",
      },
      {
        id: "midsize-suv",
        type: "Midsize SUV EV",
        rangeMiles: 300,
        batteryKWh: 82,
        driveType: "AWD",
        chargeSpeed: "10% to 80% in 34 min (DC fast)",
        description: "Higher seating position and all-weather traction.",
      },
      {
        id: "performance-crossover",
        type: "Performance Crossover EV",
        rangeMiles: 285,
        batteryKWh: 90,
        driveType: "AWD",
        chargeSpeed: "10% to 80% in 26 min (high-power DC)",
        description: "Fast acceleration with premium interior and tech.",
      },
    ];
  }
}
