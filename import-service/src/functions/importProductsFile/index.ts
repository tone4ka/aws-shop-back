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
        authorizer: {
          name: "basicAuthorizer1",
          arn:
            "arn:aws:lambda:eu-west-1:211657249927:function:authorization-service-dev-basicAuthorizer1",
          type: "request",
          resultTtlInSeconds: 0,
        },
      },
    },
  ],
};
