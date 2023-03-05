import { handlerPath } from "libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description: "return full array of products",
  events: [
    {
      http: {
        method: "get",
        path: "products",
        cors: true,
      },
    },
  ],
};
