import { S3 } from "aws-sdk";
import getPath from "./get-path";

var s3 = new S3({
  signatureVersion: 'v4'
});

const uploadFile = (
  bucket: string,
  id: string,
  config: any,
  body: any
) => {
  if (!bucket) throw new Error("Not a valid bucket name");


  if (config && config.buffer)
    return new Promise((res: any, rej: any) => {
      s3.upload(
        { Bucket: bucket, Body: body, Key: getPath(id, config.folder) },
        (err: any, data: any) => {
          if (err) rej(err);
          if (data) res(data);
        }
      );
    });

  return s3.getSignedUrl("putObject", { Bucket: bucket, Key: id, Expires: 120 });
};

export default uploadFile;

