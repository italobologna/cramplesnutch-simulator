import { ItineraryRepository } from "../../domain/itinerary/itinerary.repository.ts";
import { Itinerary } from "../../domain/model/itinerary.ts";

export class ItineraryRepositoryImpl extends ItineraryRepository {
  private itineraries: Itinerary[];

  constructor() {
    super();
    this.itineraries = new Array<Itinerary>();
  }

  findAll(): Promise<Itinerary[]> {
    const itineraries = [...this.itineraries];
    return Promise.resolve(itineraries);
  }

  addItinerary(itinerary: Itinerary): Promise<Number> {
    const length = this.itineraries.push(itinerary);
    return Promise.resolve(length);
  }

  deleteItinerary(itineraryToDelete: Itinerary): Promise<boolean> {
    let searchIndex = this.itineraries.findIndex((itinerary) =>
      itinerary.httpPath == itineraryToDelete.httpPath &&
      itinerary.httpMethod == itineraryToDelete.httpMethod
    );

    if (searchIndex === -1) {
      return Promise.resolve(false);
    } else {
      this.itineraries.splice(searchIndex, 1);
      return Promise.resolve(true);
    }
  }
}
