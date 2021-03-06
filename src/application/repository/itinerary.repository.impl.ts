import { ItineraryRepository } from "../../domain/model/itinerary.repository.ts";
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

  findByPathAndMethod(
    path: string,
    method: string,
  ): Promise<Itinerary | undefined> {
    return Promise.resolve(
      this.itineraries.find((itinerary) =>
        itinerary.httpPath === path &&
        itinerary.httpMethod === method
      ),
    );
  }

  addItinerary(itinerary: Itinerary): Promise<number> {
    const length = this.itineraries.push(itinerary);
    return Promise.resolve(length);
  }

  addAllItineraries(itineraries: Itinerary[]): Promise<number> {
    const length = this.itineraries.push(...itineraries);
    return Promise.resolve(length);
  }

  deleteItinerary(itineraryToDelete: Itinerary): Promise<boolean> {
    const searchIndex = this.itineraries.findIndex((itinerary) =>
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

  deleteAllItineraries(): Promise<boolean> {
    this.itineraries.splice(0);
    return Promise.resolve(true);
  }
}
