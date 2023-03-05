import { formatJSONResponse } from "libs/api-gateway";
import { middyfy } from "libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getProducts } from "utils/products";

const getProductsList = async (event: Omit<APIGatewayProxyEvent, "body">) => {
  console.log("Get products:", JSON.stringify(event));
  const products = await getProducts();
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
