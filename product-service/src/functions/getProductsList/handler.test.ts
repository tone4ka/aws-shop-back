import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getProducts } from "dataMock/products";
import { main } from "./handler";

jest.mock("dataMock/products");

describe("getProductsList", () => {
  test("should return product list", async () => {
    (getProducts as jest.Mock).mockResolvedValue([]);
    const res = await main(
      { headers: {} } as Omit<APIGatewayProxyEvent, "body"> & {
        body: string;
        rawBody: string;
      },
      {} as Context
    );
    expect(JSON.parse(res.body)).toStrictEqual([]);
  });
});
