import { object, number, string, optional, toInt, Type } from "./decoder";

export const paramsDecoder = object({
  userId: toInt(string)
});
export type Params = Type<typeof paramsDecoder>;

export const queryDecoder = object({
  q: optional(string)
});
export type Query = Type<typeof queryDecoder>;

export const bodyDecoder = object({
  age: number,
  name: string
});
export type Body = Type<typeof bodyDecoder>;
