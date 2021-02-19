import { Singleton } from "https://deno.land/x/deninject@1.0.3/decorators.ts";
import { ItineraryRepository } from "../domain/itinerary/itinerary.repository.ts";
import { JourneyRepository } from "../domain/model/journey.repository.ts";
import { AddItineraryUseCase } from "../domain/usecases/add.itinerary.ts";
import { DeleteItinerariesUseCase } from "../domain/usecases/delete.itinerary.ts";
import { ListItinerariesUseCase } from "../domain/usecases/list.itinerary.ts";
import { ItineraryController } from "./api/itinerary.controller.ts";
import { MainApplication } from "./main.application.ts";
import { ItineraryRepositoryImpl } from "./repository/itinerary.repository.impl.ts";
import { JourneyRepositoryImpl } from "./repository/journey.repository.impl.ts";

export class MainModule {
  @Singleton()
  public buildMainApplication(
    itineraryController: ItineraryController,
  ): MainApplication {
    return new MainApplication(itineraryController);
  }

  @Singleton()
  public buildItineraryController(
    addItineraryUseCase: AddItineraryUseCase,
    listItinerariesUseCase: ListItinerariesUseCase,
    deleteItinerariesUseCase: DeleteItinerariesUseCase,
  ): ItineraryController {
    return new ItineraryController(
      addItineraryUseCase,
      listItinerariesUseCase,
      deleteItinerariesUseCase,
    );
  }

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
  public buildItineraryRepository(): ItineraryRepository {
    return new ItineraryRepositoryImpl();
  }

  @Singleton()
  public buildJourneyRepository(): JourneyRepository {
    return new JourneyRepositoryImpl();
  }
}
