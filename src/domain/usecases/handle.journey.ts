import { Body, Context } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { ItineraryRepository } from "./../model/itinerary.repository.ts";
import { Journey } from "./../model/journey.ts";
import { JourneyRepository } from "../model/journey.repository.ts";
import { UseCase } from "../use.case.ts";

export class HandleJourneyUseCase implements UseCase {
  constructor(
    private readonly itineraryRepository: ItineraryRepository,
    private readonly journeyRepository: JourneyRepository,
  ) {}

  async execute(ctx: Context): Promise<void> {
    const path = ctx.request.url.pathname;
    const method = ctx.request.method;

    const itinerary = await this.itineraryRepository
      .findByPathAndMethod(path, method);

    if (itinerary === undefined) {
      console.info(
        `Could not find itinerary for path: '${path}' and method : '${method}'`,
      );
      return;
    }

    const journey = new Journey(itinerary, Date.now());
    journey.itinerary.reqHttp = await HandleJourneyUseCase
      .getRequestBodyAsString(ctx.request.body());

    try {
      if (itinerary.tcpUrl && itinerary.tcpPort) {
        const conn = await Deno.connect({
          hostname: itinerary.tcpUrl,
          port: parseInt(itinerary.tcpPort),
        });

        await conn.write(
          HandleJourneyUseCase.hexStringToByte(itinerary.reqTcp),
        );

        let tcpRes = "";
        while (true) {
          const buf = new Uint8Array(1024);
          const readBytes = await conn.read(buf);
          if (readBytes && readBytes > 0) {
            tcpRes += HandleJourneyUseCase.byteToHexString(buf).substr(
              0,
              readBytes * 2,
            );
          }
          if (!readBytes || readBytes < 1024) {
            break;
          }
        }
        conn.close();
        journey.itinerary.resTcp = tcpRes;
      } else {
        journey.itinerary.reqTcp = "";
      }
    } catch (e) {
      console.error(e);
    }

    await this.journeyRepository.addJourney(journey);
    ctx.response.body = itinerary.resHttp;
    if (itinerary.httpResContentType) {
      ctx.response.headers.set("content-type", itinerary.httpResContentType);
    }
    ctx.response.status = itinerary.httpResCode || 200;
  }

  private static hexStringToByte(str: string) {
    if (!str) {
      return new Uint8Array(0);
    }

    const a = [];
    for (let i = 0, len = str.length; i < len; i += 2) {
      a.push(parseInt(str.substr(i, 2), 16));
    }

    return new Uint8Array(a);
  }

  private static byteToHexString(uint8arr: Uint8Array) {
    if (!uint8arr) {
      return "";
    }

    let hexStr = "";
    for (let i = 0; i < uint8arr.length; i++) {
      let hex = (uint8arr[i] & 0xff).toString(16);
      hex = (hex.length === 1) ? "0" + hex : hex;
      hexStr += hex;
    }

    return hexStr.toUpperCase();
  }

  private static async getRequestBodyAsString(body: Body): Promise<string> {
    if (body.value) {
      const jsonObj = await body.value;
      return JSON.stringify(jsonObj);
    } else {
      return "";
    }
  }
}
