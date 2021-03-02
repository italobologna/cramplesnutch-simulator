import { Context } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { HandleJourneyUseCase } from "../../domain/usecases/handle.itineary.ts";

export class JourneyMiddleware {
  constructor(
    private readonly handleItineraryUseCase: HandleJourneyUseCase,
  ) {}

  async intercept(ctx: Context) {
    await this.handleItineraryUseCase.execute(ctx);
  }
}
