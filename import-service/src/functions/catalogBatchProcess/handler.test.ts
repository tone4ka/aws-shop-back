import { SQSEvent, Context } from "aws-lambda";
import { catalogBatchProcess } from "./handler";

const addProductItemMock = jest.fn();
jest.mock("./utils/products", () => ({
  addProductItem: (product) => addProductItemMock(product),
}));
const publishToSNSMock = jest.fn();
jest.mock("./utils/publishToSNS", () => ({
  publishToSNS: (products) => publishToSNSMock(products),
}));

const productMock = {
  title: "Test title",
  imageUrl: "http...",
  price: 3,
  count: 1,
};

const eventMock = {
  Records: [
    {
      body: JSON.stringify(productMock),
    },
  ],
};

describe("catalogBatchProcess", () => {
  test("should add received products to the database and publish a message to sns", async () => {
    await catalogBatchProcess(eventMock as SQSEvent, {} as Context, jest.fn);

    expect(addProductItemMock).toHaveBeenCalledWith(productMock);
    expect(publishToSNSMock).toHaveBeenCalledWith([productMock]);
  });
});
