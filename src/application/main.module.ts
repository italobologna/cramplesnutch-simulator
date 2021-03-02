import { Singleton } from "https://deno.land/x/deninject@1.0.3/decorators.ts";
import { ItineraryRepository } from "../domain/model/itinerary.repository.ts";
import { JourneyRepository } from "../domain/model/journey.repository.ts";
import { AddItineraryUseCase } from "../domain/usecases/add.itinerary.ts";
import { DeleteItinerariesUseCase } from "../domain/usecases/delete.itinerary.ts";
import { HandleJourneyUseCase } from "../domain/usecases/handle.journey.ts";
import { ListItinerariesUseCase } from "../domain/usecases/list.itinerary.ts";
import { RetrieveJourneysUseCase } from "../domain/usecases/retrieve.journeys.ts";
import { ItineraryController } from "./api/itinerary.controller.ts";
import { JourneyMiddleware } from "./api/journey.middleware.ts";
import { MainApplication } from "./main.application.ts";
import { ItineraryRepositoryImpl } from "./repository/itinerary.repository.impl.ts";
import { JourneyRepositoryImpl } from "./repository/journey.repository.impl.ts";

export class MainModule {
  @Singleton()
  public buildMainApplication(
    itineraryController: ItineraryController,
    journeyMiddleware: JourneyMiddleware
  ): MainApplication {
    return new MainApplication(itineraryController, journeyMiddleware);
  }

  // --- Entrypoints ---

  @Singleton()
  public buildItineraryController(
    addItineraryUseCase: AddItineraryUseCase,
    listItinerariesUseCase: ListItinerariesUseCase,
    deleteItinerariesUseCase: DeleteItinerariesUseCase,
    retrieveJourneysUseCase: RetrieveJourneysUseCase,
  ): ItineraryController {
    return new ItineraryController(
      addItineraryUseCase,
      listItinerariesUseCase,
      deleteItinerariesUseCase,
      retrieveJourneysUseCase,
    );
  }

  @Singleton()
  public buildJourneyMiddleware(
    handleJourneyUseCase: HandleJourneyUseCase,
  ): JourneyMiddleware {
    return new JourneyMiddleware(handleJourneyUseCase);
  }

  // --- Use Cases ---

  @Singleton()
  public buildAddItineraryUseCase(
    itineraryRepository: ItineraryRepository,
  ): AddItineraryUseCase {
    return new AddItineraryUseCase(itineraryRepository);
  }

  @Singleton()
  public buildListItinerariesUseCase(
    itineraryRepository: ItineraryRepository,
  ): ListItinerariesUseCase {
    return new ListItinerariesUseCase(itineraryRepository);
  }

  @Singleton()
  public buildDeleteItinerariesUseCase(
    itineraryRepository: ItineraryRepository,
  ): DeleteItinerariesUseCase {
    return new DeleteItinerariesUseCase(itineraryRepository);
  }

  @Singleton()
  public buildRetrieveJourneysUseCase(
    journeyRepository: JourneyRepository,
  ): RetrieveJourneysUseCase {
    return new RetrieveJourneysUseCase(journeyRepository);
  }

  @Singleton()
  public buildHandleItineraryUseCase(
    itineraryRepository: ItineraryRepository,
    journeyRepository: JourneyRepository,
  ): HandleJourneyUseCase {
    return new HandleJourneyUseCase(itineraryRepository, journeyRepository);
  }

  // --- Repositories ---

  @Singleton()
  public buildItineraryRepository(): ItineraryRepository {
    return new ItineraryRepositoryImpl();
  }

  @Singleton()
  public buildJourneyRepository(): JourneyRepository {
    return new JourneyRepositoryImpl();
  }
}
