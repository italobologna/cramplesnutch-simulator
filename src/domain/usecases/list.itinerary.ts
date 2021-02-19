import { ItineraryRepository } from "../itinerary/itinerary.repository.ts";
import { Itinerary } from "../model/itinerary.ts";
import { UseCase } from "../use.case.ts";

export class ListItinerariesUseCase implements UseCase {
  
  constructor(private repository: ItineraryRepository) {}

  execute() : Promise<Itinerary[]> {
    const itineraries = this.repository.findAll();
    return Promise.resolve(itineraries);
  }
}