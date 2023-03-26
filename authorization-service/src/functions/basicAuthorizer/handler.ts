import { middyfy } from "@libs/lambda";
import { APIGatewayRequestAuthorizerEvent, APIGatewayAuthorizerResult } from "aws-lambda";

const getResponse = (methodArn: string, userName?: string, password?: string) => {
  const storedPassword = process.env[userName];

  return {
    principalId: userName || 'not defined',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: storedPassword && password && storedPassword === password ? 'Allow': 'Deny',
          Resource: methodArn
        }
      ]
    },
  }
}

const basicAuthorizer1 = (
  event: APIGatewayRequestAuthorizerEvent
): APIGatewayAuthorizerResult => {

  const authorizationToken = event.headers?.Authorization?.split(" ")[1];
  if(!authorizationToken) {
    return getResponse(event.methodArn);
  }

  const buf = Buffer.from(authorizationToken, "base64");
  const [userName, password] = buf.toString("utf-8").split(":");

  return getResponse(event.methodArn, userName, password);
};

export const main = middyfy(basicAuthorizer1);
