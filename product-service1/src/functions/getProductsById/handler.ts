import { formatJSONErrorResponse, formatJSONResponse } from "libs/api-gateway";
import { middyfy } from "libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getProduct } from "utils/products";

const getProductsById = async (event: Omit<APIGatewayProxyEvent, "body">) => {
  try {
    const { productId } = event.pathParameters;
    const product = await getProduct(`${productId}`);
    if (!product) throw new Error("Product not found");
    return formatJSONResponse(product);
  } catch (e) {
    return formatJSONErrorResponse(e.message);
  }
};

export const main = middyfy(getProductsById);
