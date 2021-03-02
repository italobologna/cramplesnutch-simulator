import { ItineraryRepository } from "../model/itinerary.repository.ts";
import { Itinerary } from "../model/itinerary.ts";
import { UseCase } from "../use.case.ts";

export class ListItinerariesUseCase implements UseCase {
  
  constructor(private repository: ItineraryRepository) {}

  execute() : Promise<Itinerary[]> {
    return this.repository.findAll();
  }
}