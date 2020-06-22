import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { getData, postData } from "./routes.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

const router = new Router();
router.get("/api", getData);
router.post("/api", postData);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

console.log(`Listening on port ${PORT}...`);
await app.listen(`${HOST}:${PORT}`);
