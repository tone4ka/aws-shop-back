import { formatJSONResponse } from "libs/api-gateway";
import { middyfy } from "libs/lambda";
import { getProducts } from "utils/products";

const getProductsList = async () => {
  const products = await getProducts();
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
