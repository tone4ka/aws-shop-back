import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description:
    "http authorizer with request type for importProductFile api",
};
