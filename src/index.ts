import { validate } from "@tenex/schema-validate";
import _template from "./lib/get-template";
import getFile from "./lib/get-file";
import uploadFile from "./lib/upload-file";
import listFiles from "./lib/list-files";
import * as deepmerge from "deepmerge";
export default async function (request: any) {
  validate(request, _template);

  const config = getConfig(request);
  const { body, id, intent } = request;
  const bucket: string = process.env[this.id];


  let res;
  switch (intent) {
    case "put":
      res = await uploadFile(bucket, id, config);
      return res;

    case "list":
      res = await listFiles(bucket, id, config);
      const content = res.Contents.map(v => v.Key);
      return content;

    case "get":
      return await getFile(bucket, id, config);
  }
}

function getConfig(object: any): any {
  const { buffer, folder } = object;
  const out: any = {};
  if (buffer) out.buffer = buffer;
  if (folder) out.folder = folder;
  return out;
}
