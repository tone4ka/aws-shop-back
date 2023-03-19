import { S3 } from "aws-sdk";

const BUCKET = process.env.BUCKET_NAME;

export async function getFilesList(s3: S3) {
  const catalogs = await s3
    .listObjectsV2({
      Bucket: BUCKET,
      Prefix: "uploaded/",
      Delimiter: "/",
    })
    .promise();

  const [_, ...filesData] = catalogs.Contents;
  console.log("UPLOADED FILES: " + JSON.stringify(filesData));

  return filesData;
}
