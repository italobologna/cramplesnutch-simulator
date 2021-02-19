import { Itinerary } from "./itinerary.ts";

export class Journey {
  constructor(public itinerary: Itinerary, public timestamp: number) {}
}
