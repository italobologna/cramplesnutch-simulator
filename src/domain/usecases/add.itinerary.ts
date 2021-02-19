import { Itinerary } from "../model/itinerary.ts";
import { ItineraryRepository } from "../itinerary/itinerary.repository.ts";
import {UseCase} from "./../use.case.ts"

export class AddItineraryUseCase implements UseCase {

  constructor(private repository: ItineraryRepository) {}

  execute(itinerary: Itinerary) : Promise<boolean> {
    this.repository.addItinerary(itinerary);
    return Promise.resolve(true);
  }
}