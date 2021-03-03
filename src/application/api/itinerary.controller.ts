import {
  Context,
  helpers,
  Request,
  Response,
  Router,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { Itinerary } from "../../domain/model/itinerary.ts";
import { AddAllItinerariesUseCase } from "../../domain/usecases/add.all.itineraries.ts";
import { AddItineraryUseCase } from "../../domain/usecases/add.itinerary.ts";
import { DeleteItinerariesUseCase } from "../../domain/usecases/delete.itinerary.ts";
import { ListItinerariesUseCase } from "../../domain/usecases/list.itinerary.ts";
import { RetrieveJourneysUseCase } from "../../domain/usecases/retrieve.journeys.ts";

export class ItineraryController {
  private readonly router: Router;

  constructor(
    private readonly addItineraryUseCase: AddItineraryUseCase,
    private readonly listItinerariesUseCase: ListItinerariesUseCase,
    private readonly deleteItinerariesUseCase: DeleteItinerariesUseCase,
    private readonly retrieveJourneysUseCase: RetrieveJourneysUseCase,
    private readonly addAllItinerariesUseCase: AddAllItinerariesUseCase,
  ) {
    this.router = new Router();
    this.router.get("/api", this.getRoute());
    this.router.post("/api", this.postRoute());
    this.router.put("/api", this.putRoute());
    this.router.delete("/api", this.deleteRoute());
    this.router.get("/api/history", this.getJourneyHistory());
  }

  routes() {
    return this.router.routes();
  }

  allowedMethods() {
    return this.router.allowedMethods();
  }

  private getRoute() {
    return async ({ response }: { response: Response }) => {
      await this.listItinerariesUseCase.execute()
        .then(JSON.stringify)
        .then((itineraries) => {
          response.body = itineraries;
          response.status = 200;
        }).catch(() => response.status = 500);
    };
  }

  private postRoute() {
    return async (
      { request, response }: { request: Request; response: Response },
    ) => {
      const body = await request.body().value;
      const object = JSON.parse(body);
      const itinerary = Object.assign(new Itinerary(), object);

      await this.addItineraryUseCase.execute(itinerary)
        .then(() => this.listItinerariesUseCase.execute())
        .then(JSON.stringify)
        .then((itineraries) => {
          response.body = itineraries;
          response.status = 200;
        }).catch((e) => {
          console.error(e);
          response.status = 500;
        });
    };
  }

  private putRoute() {
    return async (
      { request, response }: { request: Request; response: Response },
    ) => {
      const body = await request.body().value;
      console.log(body);
      const arr = JSON.parse(body);
      if (!Array.isArray(arr)) {
        response.status = 400;
        return;
      }

      const itineraries: Itinerary[] = arr.map((itineraryObj) =>
        Object.assign(new Itinerary(), itineraryObj)
      );

      await this.addAllItinerariesUseCase.execute(itineraries)
        .then(() => this.listItinerariesUseCase.execute())
        .then(JSON.stringify)
        .then((itineraries) => {
          response.body = itineraries;
          response.status = 200;
        }).catch(e => {
          console.error(e);
          response.status = 500;
        });
    };
  }

  private deleteRoute() {
    return async (ctx: Context) => {
      const queryParams = helpers.getQuery(ctx, { mergeParams: true });

      const httpPath = queryParams.httpPath;
      const httpMethod = queryParams.httpMethod;

      if (!httpPath || !httpMethod) {
        ctx.response.status = 400;
        return;
      }

      try {
        const deleted = await this.deleteItinerariesUseCase
          .execute(httpPath, httpMethod);
        if (deleted) {
          const itineraries = await this.listItinerariesUseCase.execute();
          ctx.response.body = JSON.stringify(itineraries);
          ctx.response.status = 200;
        } else {
          ctx.response.status = 404;
        }
      } catch (e) {
        console.error(e);
        ctx.response.status = 500;
      }
    };
  }

  private getJourneyHistory() {
    return async ({ response }: { response: Response }) => {
      const journeys = await this.retrieveJourneysUseCase.execute();
      response.body = JSON.stringify(journeys);
      response.status = 200;
    };
  }
}
