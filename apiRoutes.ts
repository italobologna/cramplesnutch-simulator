import { helpers } from "https://deno.land/x/oak@v6.0.1/mod.ts";

export const routes: any = [];
export const messageHistoryQueue: any = [];

export const getHistory = ({ response }: { response: any }) => {
  let messages: any = [];
  while (messageHistoryQueue.length > 0) {
    messages.push(messageHistoryQueue.pop());
  }
  response.body = JSON.stringify(messages);
  response.status = 200;
};

export const getRoutes = ({ response }: { response: any }) => {
  response.body = JSON.stringify(routes);
  response.status = 200;
};

// @ts-ignore
export const postRoute = async (
  { request, response }: { request: any; response: any },
) => {
  let body = await request.body();
  let json = await body.value;
  routes.push(JSON.parse(json));

  response.body = routes;
  response.status = 200;
};

export const deleteRoute = async (ctx: any) => {
  let queryParams = helpers.getQuery(ctx, { mergeParams: true });

  let httpPath = queryParams.httpPath;
  let httpMethod = queryParams.httpMethod;

  if (!httpPath || !httpMethod) {
    ctx.response.status = 400;
    return;
  }

  let searchIndex = routes.findIndex((route: any) => {
    return route.httpPath === httpPath && route.httpMethod === httpMethod;
  });

  if (searchIndex === -1) {
    ctx.response.status = 404;
    return;
  }
  routes.splice(searchIndex, 1);

  ctx.response.body = JSON.stringify(routes);
  ctx.response.status = 200;
};
