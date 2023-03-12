import { S3 } from "aws-sdk";

const BUCKET = process.env.BUCKET_NAME;

export async function replaceParcedFiles(s3: S3, fileData: S3.Object) {
        await s3.copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${fileData.Key}`,
          Key: fileData.Key.replace('uploaded', 'parsed')
        }).promise();
        
        await s3.deleteObject({
          Bucket: BUCKET,
          Key: fileData.Key
        }).promise()
}