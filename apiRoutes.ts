import {helpers} from 'https://deno.land/x/oak/mod.ts'

export let routes: any = [];

export const getRoute = ({response}: { response: any }) => {
  response.body = JSON.stringify(routes);
  response.status = 200;
};

// @ts-ignore
export const postRoute = async (
    {request, response}: { request: any; response: any },
) => {
  let body = await request.body();
  let data = JSON.parse(body.value);
  routes.push(data);

  response.body = JSON.stringify(routes);
  response.status = 200;
};

export const deleteRoute = async (ctx: any) => {
  let queryParams = helpers.getQuery(ctx, {mergeParams: true});

  let httpPath = queryParams.httpPath;
  let httpMethod = queryParams.httpMethod;

  if (!httpPath || !httpMethod) {
    ctx.response.status = 400;
    return;
  }

  let searchIndex = routes.findIndex((route: any) => {
    return route.httpPath === httpPath && route.httpMethod === httpMethod
  });
  
  if (searchIndex === -1) {
    ctx.response.status = 404;
    return
  }
  routes.splice(searchIndex, 1);

  ctx.response.body = JSON.stringify(routes);
  ctx.response.status = 200;
};
