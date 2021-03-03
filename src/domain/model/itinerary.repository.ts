import { Itinerary } from "./itinerary.ts";

export abstract class ItineraryRepository {
  abstract findAll(): Promise<Itinerary[]>;
  abstract findByPathAndMethod(path: string, method: string): Promise<Itinerary | undefined>
  abstract addItinerary(itinerary: Itinerary): Promise<number>;
  abstract addAllItineraries(itineraries: Itinerary[]): Promise<number>;
  abstract deleteItinerary(itinerary: Itinerary): Promise<boolean>;
  abstract deleteAllItineraries(): Promise<boolean>;
}
