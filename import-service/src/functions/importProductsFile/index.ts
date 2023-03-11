import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description:
    "create a new Signed URL with the following key: uploaded/${fileName}",
  events: [
    {
      http: {
        method: "get",
        path: "import",
        cors: true,
      },
    },
  ],
};
