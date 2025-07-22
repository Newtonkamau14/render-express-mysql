import { ZodObject,ZodType } from 'zod';

type AnyZodObject = ZodObject<Record<string, ZodType>>;

export default interface RequestValidators {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}
