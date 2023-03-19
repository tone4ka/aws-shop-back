import type { AWS } from "@serverless/typescript";

import {
  importProductsFile,
  importFileParser,
  catalogBatchProcess,
} from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "3",
  // plugins: ["serverless-auto-swagger", "serverless-esbuild"],
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    profile: "default",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      BUCKET_NAME: "import-service22",
      CATALOG_ITEMS_QUEUE: "catalogItemsQueue",
      PRODUCT_TABLE_NAME: "Products1",
      STOCK_TABLE_NAME: "Stock",
      TOPIC_ARN: { Ref: "SNSTopic" },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: [
          `arn:aws:s3:::${process.env.BUCKET_NAME}`,
          `arn:aws:s3:::${process.env.BUCKET_NAME}/*`,
        ],
      },
      {
        Effect: "Allow",
        Action: ["sqs:*"],
        Resource: { "Fn::GetAtt": ["catalogItemsQueue", "Arn"] },
      },
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: "arn:aws:dynamodb:eu-west-1:211657249927:table/Products1",
      },
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: "arn:aws:dynamodb:eu-west-1:211657249927:table/Stock",
      },
      {
        Effect: "Allow",
        Action: ["sns:*"],
        Resource: { Ref: "SNSTopic" },
      },
    ],
  },
  functions: { importFileParser, importProductsFile, catalogBatchProcess },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "SNSTopic"
        },
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: "toniamik@gmail.com",
          TopicArn: { Ref: "SNSTopic" }
        },
      }
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    // autoswagger: {
    //   apiType: "http",
    //   basePath: "/${sls:stage}",
    // },
  },
};

module.exports = serverlessConfiguration;
