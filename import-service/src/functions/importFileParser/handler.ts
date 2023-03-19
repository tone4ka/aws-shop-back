import { S3 } from "aws-sdk";
import middy from "@middy/core";
import { parseCatalog } from "./parseCatalog";
import { replaceParcedFiles } from "./replaceParcedFiles";
import { getFilesList } from "./getFilesList";
import { sendDatatoQueue } from "./sendDataToQeue";

const importFileParser = async () => {
  try {
    const s3 = new S3({ region: "eu-west-1" });

    const filesData = await getFilesList(s3);

    const parsedProductLists = await Promise.all(
      filesData.map((fileData) => parseCatalog(fileData.Key))
    );

    await Promise.all(
      parsedProductLists.flat().map((product) => sendDatatoQueue(product))
    );

    await Promise.all(
      filesData.map((fileData) => replaceParcedFiles(s3, fileData))
    );
  } catch (e) {
    console.log(e.message);
  }
};

export const main = middy(importFileParser);
