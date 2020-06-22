import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

const env = Deno.env.toObject()
const PORT = env.PORT || 4000
const HOST = env.HOST || '127.0.0.1'

const router = new Router()

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT}...`)

await app.listen(`${HOST}:${PORT}`)





// import { serve } from "https://deno.land/std@0.57.0/http/server.ts";
// const s = serve({ port: 8000 });
// console.log("http://localhost:8000/");
// for await (const req of s) {
//   req.respond({ body: "Hello World\n" });
// }
