import * as aws from "aws-sdk"
import { validate } from "@tenex/schema-validate"
import _template from "./lib/template"
import sendSms from "./lib/send-sms";
export default async function (request: any) {
  validate(request, _template);

  return sendSms(request)
}


