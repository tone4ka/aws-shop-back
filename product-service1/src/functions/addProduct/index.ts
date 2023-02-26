import schema from "./schema";
import { handlerPath } from "libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    TABLE_NAME: process.env.PRODUCTS_TABLE_NAME,
  },
  events: [
    {
      http: {
        method: "post",
        path: "products",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
