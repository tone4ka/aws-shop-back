import type { AWS } from "@serverless/typescript";

import getProductsList from "functions/getProductsList";
import getProductsById from "functions/getProductsById";
import addProduct from "functions/addProduct";

const serverlessConfiguration: AWS = {
  service: "product-service1",
  frameworkVersion: "3",
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
    iam: {
      role: "arn:aws:iam::211657249927:role/DynamoDBAccessRole",
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCT_TABLE_NAME: "Products1",
      STOCK_TABLE_NAME: "Stock",
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, addProduct },
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
  },
};

module.exports = serverlessConfiguration;
