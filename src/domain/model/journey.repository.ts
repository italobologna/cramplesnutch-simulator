import { Journey } from "./journey.ts";

export abstract class JourneyRepository {
  abstract popAll(): Promise<Journey[]>;
  abstract addJourney(journey: Journey): Promise<void>;
}
