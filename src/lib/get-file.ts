import { S3 } from "aws-sdk";

const s3 = new S3();

const getFile = (
  bucket: string,
  id: string,
  config: any
): Promise<S3.GetObjectOutput> | string => {
  if (!bucket) throw new Error("Not a valid bucket name");

  if (config.buffer) {
    return new Promise((res: any, rej: any) => {
      s3.getObject(
        { Bucket: bucket, Key: id },
        (err: any, data: S3.GetObjectOutput) => {
          if (err) rej(err);
          if (data) res(data.Body);
        }
      );
    });
  }
  // If a buffer is not needed a simple signed url is provided
  return s3.getSignedUrl("getObject", { Bucket: bucket, Key: id });
};

export default getFile;
