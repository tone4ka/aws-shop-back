import type { AWS } from "@serverless/typescript";

import getProductsList from "functions/getProductsList";
import getProductsById from "functions/getProductsById";
import addProduct from "functions/addProduct";
import catalogBatchProcess from "functions/catalogBatchProcess";

const serverlessConfiguration: AWS = {
  service: "product-service1",
  frameworkVersion: "3",
  plugins: ["serverless-auto-swagger", "serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    profile: "default",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
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
        Resource: { Ref: "SNSTopic4" },
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCT_TABLE_NAME: "Products1",
      STOCK_TABLE_NAME: "Stock",
      TOPIC_ARN: { Ref: "SNSTopic4" },
    },
  },
  functions: {
    getProductsList,
    getProductsById,
    addProduct,
    catalogBatchProcess,
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
    autoswagger: {
      apiType: "http",
      basePath: "/${sls:stage}",
    },
  },
  resources: {
    Resources: {
      SNSTopic4: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "SNSTopic4",
        },
      },
      SNSSubscription1: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: "toniamik@gmail.com",
          TopicArn: { Ref: "SNSTopic4" },
          FilterPolicy: {
            HasImage: ["has"],
          },
          FilterPolicyScope: "MessageAttributes",
        },
      },
      SNSSubscription2: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: "toniamik@yandex.com",
          TopicArn: { Ref: "SNSTopic4" },
          FilterPolicy: {
            HasImage: ["has not"],
          },
          FilterPolicyScope: "MessageAttributes",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
