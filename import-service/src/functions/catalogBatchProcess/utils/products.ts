import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Product } from "./types";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const productTableName = process.env.PRODUCT_TABLE_NAME;
const stockTableName = process.env.STOCK_TABLE_NAME;

export async function addProductItem(
  product: Omit<Product, "id">
): Promise<PutCommandOutput> {
  const id = uuidv4();
  const res = await Promise.all([
    dynamo.send(
      new PutCommand({
        TableName: productTableName,
        Item: {
          id: id,
          title: product.title || "Untitled",
          description:
            product.description ||
            "Description will be added as soon as possible, sorry for the inconvenience",
          price: product.price || 0,
          imageUrl: product.imageUrl || "",
        },
      })
    ),
    dynamo.send(
      new PutCommand({
        TableName: stockTableName,
        Item: {
          id: id,
          count: product.count,
        },
      })
    ),
  ]);

  return res[0];
}
