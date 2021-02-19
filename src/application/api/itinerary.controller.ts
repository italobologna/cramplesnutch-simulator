import {
  Context,
  helpers,
  Request,
  Response,
  Router,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { Itinerary } from "../../domain/model/itinerary.ts";
import { AddItineraryUseCase } from "../../domain/usecases/add.itinerary.ts";
import { DeleteItinerariesUseCase } from "../../domain/usecases/delete.itinerary.ts";
import { ListItinerariesUseCase } from "../../domain/usecases/list.itinerary.ts";
import { getHistory } from "./routes.ts";

export class ItineraryController {
  private readonly router: Router;

  constructor(
    private readonly addItineraryUseCase: AddItineraryUseCase,
    private readonly listItinerariesUseCase: ListItinerariesUseCase,
    private readonly deleteItinerariesUseCase: DeleteItinerariesUseCase,
  ) {
    this.router = new Router();
    this.router.get("/api", this.getRoute());
    this.router.post("/api", this.postRoute());
    this.router.delete("/api", this.deleteRoute());
    this.router.get("/api/history", getHistory);
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
      let body = await request.body().value;
      const object = JSON.parse(body);

      const itinerary = new Itinerary();
      itinerary.httpMethod = object.httpMethod;
      itinerary.httpPath = object.httpPath;
      itinerary.httpResCode = object.httpResCode;
      itinerary.httpResContentType = object.httpResContentType;
      itinerary.reqHttp = object.reqHttp;
      itinerary.reqTcp = object.reqTcp;
      itinerary.resHttp = object.resHttp;
      itinerary.resTcp = object.resTcp;
      itinerary.tcpPort = object.tcpPort;
      itinerary.tcpUrl = object.tcpUrl;

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

  private deleteRoute() {
    return async (ctx: Context) => {
      let queryParams = helpers.getQuery(ctx, { mergeParams: true });

      let httpPath = queryParams.httpPath;
      let httpMethod = queryParams.httpMethod;

      if (!httpPath || !httpMethod) {
        ctx.response.status = 400;
        return;
      }

      try {
        const deleted = await this.deleteItinerariesUseCase
          .execute(httpPath, httpMethod);
        if (deleted) {
          const itineraries = this.listItinerariesUseCase.execute();
          ctx.response.body = JSON.stringify(itineraries);
          ctx.response.status = 200;
        } else {
          ctx.response.status = 404;
        }
      } catch (e) {
        console.error(e);
      }
    };
  }
}
