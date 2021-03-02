import { ItineraryRepository } from "../model/itinerary.repository.ts";
import { UseCase } from "../use.case.ts";

export class DeleteItinerariesUseCase implements UseCase {
  constructor(private repository: ItineraryRepository) {}

  execute(httpPath: string, httpMethod: string): Promise<boolean> {
    return this.repository.findAll()
      .then((itineraries) =>
        itineraries.find((itinerary) =>
          itinerary.httpPath === httpPath && itinerary.httpMethod === httpMethod
        )
      ).then(itineraryToDelete => {
        if (itineraryToDelete) {
          return this.repository.deleteItinerary(itineraryToDelete);
        } else {
          return false;
        }
      });
  }
}
