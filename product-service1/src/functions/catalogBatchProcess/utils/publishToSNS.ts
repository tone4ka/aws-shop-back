import { SNS } from "@aws-sdk/client-sns";
import { Product } from "utils/types";

function getParams(products: Omit<Product, "id">[], hasImage: boolean) {
  return {
    Subject: "Products uploaded",
    Message: JSON.stringify(products),
    TopicArn: process.env.TOPIC_ARN,
    MessageAttributes: {
      HasImage: {
        DataType: "String",
        StringValue: hasImage ? "has" : "has not",
      },
    },
  };
}

export async function publishToSNS(products: Omit<Product, "id">[]) {
  const sns = new SNS({ region: "eu-west-1" });

  const productsWithImage = products.filter((product) => product.imageUrl);
  const productsWithoutImage = products.filter((product) => !product.imageUrl);

  try {
    if (productsWithImage.length) {
      await sns.publish(getParams(productsWithImage, true));
      console.log(
        "EMAIL WAS SENT for products:",
        JSON.stringify(productsWithImage)
      );
    }
    if (productsWithoutImage.length) {
      await sns.publish(getParams(productsWithoutImage, false));
      console.log(
        "EMAIL WAS SENT for products:",
        JSON.stringify(productsWithoutImage)
      );
    }
  } catch (e) {
    console.log("SNS ERROR:", JSON.stringify(e));
  }
}
