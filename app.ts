import {Application, Router, send} from "https://deno.land/x/oak/mod.ts";
import {getData, postData} from "./routes.ts";
import {messagingMiddleware} from "./middleware.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

const router = new Router();

router.get("/api", getData);
router.post("/api", postData);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const applicationUrls = ['\/', '', '^\/assets\/.+', '\/api']
let unlessApplication = async (middleware : any) : Promise<(ctx: any, next: any) => Promise<any>> => {
  return async (ctx : any, next : () => Promise<void>) => {
    console.log(ctx.request.url)
    if (applicationUrls.some((url => new RegExp(ctx.request.url.pathname).test(url)))) {
      console.log('Match')
      await next();
      return;
    } else {
      return middleware;
    }
  }
}

app.use(await unlessApplication(messagingMiddleware));

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

console.log(`Listening on port ${PORT}...`);
await app.listen(`${HOST}:${PORT}`);
