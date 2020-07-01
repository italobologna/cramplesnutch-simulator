import { routes } from "./apiRoutes.ts";

export const messagingMiddleware = (async (ctx: any) => {
  for (let route of routes) {
    if (route.httpPath === ctx.request.url.pathname) {
      ctx.response.body = route.resHttp;
      ctx.response.status = 200;
      return;
    }
  }
});
