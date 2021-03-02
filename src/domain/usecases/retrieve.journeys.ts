import { UseCase } from "./../use.case.ts";
import { JourneyRepository } from "../model/journey.repository.ts";
import { Journey } from "../model/journey.ts";

export class RetrieveJourneysUseCase implements UseCase {
  constructor(private repository: JourneyRepository) {}

  execute(): Promise<Journey[]> {
    return this.repository.popAll();
  }
}
