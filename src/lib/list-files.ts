import { S3 } from "aws-sdk";
import getPath from "./get-path";

const s3 = new S3();

const listFiles = (
  bucket: string,
  id: string,
  config: any
): Promise<S3.ListObjectsOutput> => {
  if (!bucket) throw new Error("Not a valid bucket name");

  console.log(getPath(config.folder, id))
  return new Promise((res: any, rej: any) => {
    s3.listObjects(
      { Bucket: bucket, Prefix: getPath(config.folder, id) },
      (err: any, data: any) => {
        if (err) rej(err);
        if (data) res(data);
      }
    );
  });
};

export default listFiles;
