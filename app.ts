import { Injector } from "https://deno.land/x/deninject@1.0.4/mod.ts";
import { send } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { MainApplication } from "./src/application/main.application.ts";
import { MainModule } from "./src/application/main.module.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

const injector = new Injector(new MainModule());
const app = injector.get(MainApplication).app;

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

console.info(`Listening on port ${PORT}...`);
await app.listen(`${HOST}:${PORT}`);
