import {Application} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import {ItineraryController} from "./api/itinerary.controller.ts";
import {JourneyMiddleware} from "./api/journey.middleware.ts";

export class MainApplication {
  private readonly applicationUrls = [/^\/$/, /^\/api/, /^\/assets\//];
  readonly app: Application;

  constructor(
    itineraryController: ItineraryController,
    journeyMiddleware: JourneyMiddleware,
  ) {
    this.app = new Application();
    this.app.use(itineraryController.routes());
    this.app.use(itineraryController.allowedMethods());
    this.app.use(async (ctx, next) => {
      if (this.pathMatchesApplicationUrls(ctx.request.url.pathname)) {
        await next();
      } else {
        await journeyMiddleware.intercept(ctx);
      }
    });
  }

  private pathMatchesApplicationUrls(path: string): boolean {
    return this.applicationUrls.some((appUrl) => new RegExp(appUrl).test(path));
  }
}
