let routeMap = new Map();

export function addRoute(route: string, messageData : object) : void {
    routeMap.set(route, messageData);
}

export const messagingMiddleware = (async (ctx : any) => {
    for (let [route, messageData] of routeMap.entries()) {
        if (route === ctx.request.url.pathname) {
            ctx.response.body = messageData.resHttp;
            ctx.response.status = 200;
            return;
        }
    }
});