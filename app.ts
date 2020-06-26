import {Application, Router, send} from "https://deno.land/x/oak/mod.ts";
import {getData, postData} from "./apiRoutes.ts";
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

const applicationUrls = [/^\/$/, /^\/api/, /^\/assets\//]
let unlessApplication = async (interceptor : any) : Promise<(ctx: any, next: any) => Promise<any>> => {
  return async (ctx : any, next : () => Promise<void>) => {
    if (applicationUrls.some(path => new RegExp(path).test(ctx.request.url.pathname))) {
      await next();
      return;
    } else {
      return await interceptor(ctx);
    }
  }
};

app.use(await unlessApplication(messagingMiddleware));

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

console.log(`Listening on port ${PORT}...`);
await app.listen(`${HOST}:${PORT}`);
