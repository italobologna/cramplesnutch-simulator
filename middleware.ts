import {routes, messageHistoryQueue} from "./apiRoutes.ts";

export const messagingMiddleware = (async (ctx: any) => {
  let route = routes.find((route: any) => {
    return route.httpPath === ctx.request.url.pathname && route.httpMethod === ctx.request.method;
  });

  if (route) {
    let messageHistory: any = {
      ...route,
      instant: Date.now()
    }
    let body = await ctx.request.body();
    messageHistory.reqHttp = body.value ? body.value : '';

    try {
      if (route.tcpUrl && route.tcpPort) {
        const conn = await Deno.connect({
          hostname: route.tcpUrl,
          port: parseInt(route.tcpPort)
        });

        await conn.write(hexStringToByte(route.reqTcp));

        let tcpRes: string = '';
        while (true) {
          const buf = new Uint8Array(1024);
          let readBytes = await conn.read(buf);
          console.log(readBytes);
          if (readBytes && readBytes > 0) {
            tcpRes += byteToHexString(buf).substr(0, readBytes * 2);
          }
          if (!readBytes || readBytes < 1024) {
            break;
          }
        }
        conn.close();
        messageHistory.resTcp = tcpRes;
      } else {
        messageHistory.reqTcp = '';
      }
    } catch (e) {
      console.error(e);
    }

    messageHistoryQueue.push(messageHistory);
    ctx.response.body = route.resHttp;
    ctx.response.status = 200;
  }
});

function hexStringToByte(str: string) {
  if (!str) {
    return new Uint8Array(0);
  }

  var a = [];
  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

function byteToHexString(uint8arr: Uint8Array) {
  if (!uint8arr) {
    return '';
  }

  var hexStr = '';
  for (var i = 0; i < uint8arr.length; i++) {
    var hex = (uint8arr[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? '0' + hex : hex;
    hexStr += hex;
  }

  return hexStr.toUpperCase();
}