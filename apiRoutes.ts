import {addRoute} from "./middleware.ts";

export const getData = ({ response }: { response: any }) => {
  response.body = { testing: "ok" };
  response.status = 200;
};

// @ts-ignore
export const postData = async (
  { request, response }: { request: any; response: any },
) => {
  let body = await request.body();
  let data = JSON.parse(body.value);
  addRoute('/xpto', data);
  response.status = 200;
};
