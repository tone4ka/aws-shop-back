import { SNS } from "@aws-sdk/client-sns";
import { Product } from "./products";

export async function publishToSNS(products: Omit<Product, "id">[]) {
    const sns = new SNS({ region: "eu-west-1"});

    const params = {
        Subject: "Products uploaded",
        Message: JSON.stringify(products),
        TopicArn: process.env.TOPIC_ARN,
    };

    try{
        await sns.publish(params);
        console.log("EMAIL WAS SENT with params:", JSON.stringify(params));
    } catch(e) {
        console.log("SNS ERROR:", JSON.stringify(e));
    }

}