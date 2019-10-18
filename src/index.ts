import * as aws from "aws-sdk"
import * as fs from "fs";
import * as path from "path";
import { validate } from "@tenex/schema-validate"
import _template from "./lib/template"
import executePython from "./lib/execute-python";
export default async function (request: any) {
  validate(request, _template);
  const { executable, input } = request
  const processName = process.env[this.id];
  const code = fs.readFileSync(path.join(__dirname, executable), "utf-8");
  const name = `${processName}-python`;
  return executePython(code, name, input)
}


