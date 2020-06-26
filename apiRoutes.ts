export let routeMap = new Map();

function routesObj() {
  let routes: any = {};
  for (let [route, messageData] of routeMap.entries()) {
    routes[route] = messageData;
  }
  return routes;
}

export const getRoute = ({ response }: { response: any }) => {
  let routes = routesObj();

  response.body = JSON.stringify(routes);
  response.status = 200;
};

// @ts-ignore
export const postRoute = async (
  { request, response }: { request: any; response: any },
) => {
  let body = await request.body();
  let data = JSON.parse(body.value);
  routeMap.set(data.route, data);

  let currentRoutes = routesObj();
  response.body = JSON.stringify(currentRoutes);
  response.status = 200;
};

export const deleteRoute = async (
  {
    response,
    params,
  }: {
    response: any;
    params: { route: string };
  },
) => {
  if (params && params.route) {
    if (routeMap.has(params.route)) {
      routeMap.delete(params.route);

      let currentRoutes = routesObj();
      response.body = JSON.stringify(currentRoutes);
      response.status = 200;
    } else {
      response.status = 404;
    }
  } else {
    response.status = 400;
  }
};
