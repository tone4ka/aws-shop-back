import { S3 } from "aws-sdk";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONErrorResponse, formatJSONResponse } from "@libs/api-gateway";

const importProductsFile = async (
  event: Omit<APIGatewayProxyEvent, "body">
) => {
  try{
    const fileName = event.queryStringParameters.name;
    if (!event.queryStringParameters || !fileName) {
      return formatJSONErrorResponse("File name is undefined");
    }
  
    const s3 = new S3({ region: "eu-west-1" });
    const BUCKET = process.env.BUCKET_NAME;

    const catalogPath = `uploaded/${fileName}`;
    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      Expires: 60,
      ContentType: "text/csv",
    };

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return formatJSONResponse({url: signedUrl});
  } catch (e) {
    return formatJSONErrorResponse(e.message);
  }

};

export const main = middyfy(importProductsFile);
