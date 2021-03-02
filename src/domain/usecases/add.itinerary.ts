import { Itinerary } from "../model/itinerary.ts";
import { ItineraryRepository } from "../model/itinerary.repository.ts";
import { UseCase } from "./../use.case.ts";

export class AddItineraryUseCase implements UseCase {
  constructor(private repository: ItineraryRepository) {}

  execute(itinerary: Itinerary): Promise<boolean> {
    return this.repository.addItinerary(itinerary).then(() => true);
  }
}
