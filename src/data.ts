import { Decoder, object, number, string, optional, toInt } from "./decoder";

interface Params {
  userId: number;
}
interface Query {
  q?: string;
}
interface User {
  age: number;
  name: string;
}
export const paramsDecoder: Decoder<Params> = object({
  userId: toInt(string)
});
export const queryDecoder: Decoder<Query> = object({
  q: optional(string)
});
export const bodyDecoder: Decoder<User> = object({
  age: number,
  name: string
});
