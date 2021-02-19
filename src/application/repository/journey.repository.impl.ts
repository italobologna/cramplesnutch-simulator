import { Journey } from "../../domain/model/journey.ts";
import { JourneyRepository } from "../../domain/model/journey.repository.ts";

export class JourneyRepositoryImpl extends JourneyRepository {
  private journeys: Journey[];

  constructor() {
    super();
    this.journeys = new Array<Journey>();
  }

  popAll(): Promise<Journey[]> {
    let journeysToReturn = this.journeys.splice(0).reverse();
    return Promise.resolve(journeysToReturn);
  };

  addJourney(journey: Journey): Promise<void> {
    this.journeys.push(journey);
    return Promise.resolve();
  };
}