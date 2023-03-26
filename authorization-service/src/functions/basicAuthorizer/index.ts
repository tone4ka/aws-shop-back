import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description:
    "http authorizer with token type for importProductFile api",
};
