import { handlerPath } from "libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description: "consumer of catalogItemsQueue",
  events: [
    {
      sqs: {
        arn: "arn:aws:sqs:eu-west-1:211657249927:catalogItemsQueue",
        batchSize: 5,
      },
    },
  ],
};
