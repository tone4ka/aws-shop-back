import { SQS, SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export const sendDatatoQueue = async (product: any) => {
  try {
    const sqs = new SQS({ region: "eu-west-1" });
    console.log("QUEUE NAME:", process.env.CATALOG_ITEMS_QUEUE);
    const { QueueUrl } = await sqs.getQueueUrl({
      QueueName: process.env.CATALOG_ITEMS_QUEUE,
    });
    console.log("QUEUE_URL:", QueueUrl);

    const sqsClient = new SQSClient({ region: "eu-west-1" });

    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: QueueUrl,
      MessageBody: JSON.stringify(product),
    });

    await sqsClient.send(sendMessageCommand);
  } catch (e) {
    console.log(e);
  }
};
