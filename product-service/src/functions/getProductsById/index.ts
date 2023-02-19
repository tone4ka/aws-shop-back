import { handlerPath } from "libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description: "return product by ID",
  events: [
    {
      http: {
        method: "get",
        path: "products/{productId}",
        cors: true,
      },
    },
  ],
};
