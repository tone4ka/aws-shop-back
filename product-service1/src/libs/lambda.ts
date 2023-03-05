import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import type { Context } from "aws-lambda";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";

export const middyValidator = (
  schema: object
): middy.MiddlewareObj<unknown, unknown, Error, Context> => {
  return validator({
    eventSchema: transpileSchema(schema, {
      verbose: true,
      messages: true,
      coerceTypes: false,
    }),
  });
};

export const middyfy = (handler, schema?: object) => {
  let middyfied = middy(handler).use(middyJsonBodyParser());
  if (schema !== undefined) {
    middyfied = middyfied.use(middyValidator(schema));
  }

  return middyfied;
};
