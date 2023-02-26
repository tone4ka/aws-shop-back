import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getProduct } from "utils/products";
import { main } from "./handler";

jest.mock("utils/products");

describe("getProductsById", () => {
  test("should return product by id", async () => {
    (getProduct as jest.Mock).mockResolvedValueOnce({});
    const res = await main(
      { headers: {}, pathParameters: "123" } as unknown as Omit<
        APIGatewayProxyEvent,
        "body"
      > & {
        body: string;
        rawBody: string;
      },
      {} as Context
    );
    expect(JSON.parse(res.body)).toStrictEqual({});
  });

  test("should return a '404 not found' response if there is no product with that id", async () => {
    (getProduct as jest.Mock).mockResolvedValueOnce(undefined);
    const res = await main(
      { headers: {}, pathParameters: "123" } as unknown as Omit<
        APIGatewayProxyEvent,
        "body"
      > & {
        body: string;
        rawBody: string;
      },
      {} as Context
    );
    expect(JSON.parse(res.statusCode)).toStrictEqual(404);
    expect(JSON.parse(res.body)).toStrictEqual("Product not found");
  });
});
