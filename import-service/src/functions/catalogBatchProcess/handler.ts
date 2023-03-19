import middy from "@middy/core";
import { SQSEvent, SQSHandler } from "aws-lambda";
import { addProductItem, Product } from "./utils/products";
import { publishToSNS } from "./utils/publishToSNS";

const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
  console.log("RECEIVED FROM SQS EVENT", JSON.stringify(event));

  const products = event.Records.map((record) =>
    JSON.parse(record.body)
  ) as Omit<Product, "id">[];

  console.log("RECEIVED FROM SQS PRODUCTS: ", JSON.stringify(products));

  try {
    await Promise.all(products.map((product) => addProductItem(product)));
    await publishToSNS(products);
  } catch (e) {
    console.log(e.message);
  }
};

export const main = middy(catalogBatchProcess);
