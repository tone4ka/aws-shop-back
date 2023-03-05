import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const productTableName = process.env.PRODUCT_TABLE_NAME;
const stockTableName = process.env.STOCK_TABLE_NAME;

export type Product = {
  description: string;
  id: string;
  imageUrl?: string;
  price: number;
  title: string;
  count: number;
};

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

export async function getProducts(): Promise<Product[]> {
  const [productBody, stockBody] = await Promise.all([
    dynamo.send(new ScanCommand({ TableName: productTableName })),
    dynamo.send(new ScanCommand({ TableName: stockTableName })),
  ]);

  const res = productBody.Items.map((item) => {
    item.count = stockBody.Items.find((i) => i.id === item.id).count || 0;
    return item;
  });

  return res as Product[];
}

export async function getProduct(id: string): Promise<Product> {
  const [body, stockBody] = await Promise.all([
    dynamo.send(
      new GetCommand({
        TableName: productTableName,
        Key: {
          id: id,
        },
      })
    ),
    dynamo.send(
      new GetCommand({
        TableName: stockTableName,
        Key: {
          id: id,
        },
      })
    ),
  ]);

  body.Item.count = stockBody.Item.count;

  return body.Item as Product;
}
