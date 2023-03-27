import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import csv from "csv-parser";
import { Readable } from "stream";

const BUCKET = process.env.BUCKET_NAME;
const client = new S3Client({ region: "eu-west-1" });

export async function parseCatalog(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const response = await client.send(command);

  const stream = (response.Body as Readable).pipe(csv());

  const results = [];
  for await (const chank of stream) {
    results.push(chank);
  }

  return results;
}
