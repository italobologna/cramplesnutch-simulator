import { Itinerary } from "./itinerary.ts";

export abstract class ItineraryRepository {
  abstract findAll(): Promise<Itinerary[]>;
  abstract addItinerary(Itinerary: Itinerary): Promise<Number>;
  abstract deleteItinerary(itinerary: Itinerary): Promise<boolean>;
}
