import {
  formatJSONErrorResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "libs/api-gateway";
import { formatJSONResponse } from "libs/api-gateway";
import { middyfy } from "libs/lambda";
import schema from "./schema";
import { addProductItem, Product } from "utils/products";

const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log("Add product request with body:", JSON.stringify(event.body));
  try {
    const result = await addProductItem(event.body as Omit<Product, "id">);
    return formatJSONResponse(result);
  } catch (e) {
    console.error(e);
    return formatJSONErrorResponse(e.message);
  }
};

export const main = middyfy(addProduct);
