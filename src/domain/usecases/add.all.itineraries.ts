import { Itinerary } from "../model/itinerary.ts";
import { ItineraryRepository } from "../model/itinerary.repository.ts";
import { UseCase } from "./../use.case.ts";

export class AddAllItinerariesUseCase implements UseCase {
  constructor(private repository: ItineraryRepository) {}

  execute(itineraries: Itinerary[]): Promise<boolean> {
    return this.repository.deleteAllItineraries()
      .then(() => this.repository.addAllItineraries(itineraries))
      .then(() => true);
  }
}
