import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';
import * as path from 'path';
import basicAuthorizer1 from '@functions/basicAuthorizer';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    profile: "default",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TONE4KA: process.env.TONE4KA,
    },
  },
  functions: { basicAuthorizer1 },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
