import { getProducts } from "dataMock/products";
import { formatJSONResponse } from "libs/api-gateway";
import { middyfy } from "libs/lambda";

const getProductsList = async () => {
  const products = await getProducts();
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
