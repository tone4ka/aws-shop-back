import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  description:
    "get an object from S3, parse it using csv-parser package and log each record to be shown in CloudWatch",
  events: [
    {
      s3: {
        bucket: "import-service22",
        event: "s3:ObjectCreated:*",
        rules:[{prefix: "uploaded/"}],
        existing: true
      },
    },
  ],
};
