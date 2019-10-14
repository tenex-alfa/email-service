import { validate } from "@tenex/schema-validate";
import _template from "./lib/get-template";
import getFile from "./lib/get-file";
import uploadFile from "./lib/upload-file";
import listFiles from "./lib/list-files";
import * as deepmerge from "deepmerge";
import getPath from "./lib/get-path"
export default async function (request: any) {
  validate(request, _template);

  const { id, intent, config, body } = request;
  const bucket: string = process.env[this.id];
  let path = getPath("/", id);

  if (config)
    path = getPath(config.folder, id);


  let res;
  switch (intent) {
    case "put":
      res = await uploadFile(bucket, path, config, body);
      // console.log(res)
      return res;

    case "list":
      res = await listFiles(bucket, path, config);
      const content = res.Contents.map(v => v.Key);
      return content;

    case "get":
      return await getFile(bucket, path, config);
  }
}


