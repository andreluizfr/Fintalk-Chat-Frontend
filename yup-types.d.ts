import { StringSchema, StringSchemaConstructor } from "yup";

declare module "yup" {
  interface StringSchema {
    password(message: string): StringSchema;
  }
}

export const string: StringSchemaConstructor;