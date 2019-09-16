import * as express from "express";
import { DecodeError, Decoder, DecodermMap } from "./decoder";
import PromiseRouter from "express-promise-router";
import { object, number, string, optional, toInt, any } from "./decoder";

type Req = express.Request;
type Res = express.Response;

const router = PromiseRouter();

function reqDecoder<P, Q, B>(options: {
  params?: DecodermMap<P>;
  query?: DecodermMap<Q>;
  body?: Decoder<B>;
}): Decoder<{ params: P; query: Q; body: B }> {
  return object({
    params: options.params ? object(options.params) : any,
    query: options.query ? object(options.query) : any,
    body: options.body || any
  });
}

router.use(express.json());

router.post("/users", async (req: Req, res: Res) => {
  const { body } = reqDecoder({
    body: object({
      age: number,
      name: string
    })
  }).run(req);
  console.log("body", body);
  res.send({ message: "ok" });
});

router.get("/users/:userId", async (req: Req, res: Res) => {
  const { params, query } = reqDecoder({
    params: {
      userId: toInt(string)
    },
    query: {
      q: optional(string)
    }
  }).run(req);
  console.log("params", params);
  console.log("query", query);
  res.send({ message: "ok" });
});

const app = express();
app.use(express.json());
app.use("/", router);
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof DecodeError) {
    return res.status(400).send({
      message: err.message
    });
  }
  res.status(500).send({
    message: "unexpected error"
  });
});

export async function start(port: number): Promise<any> {
  return app.listen(port, () => {
    console.log("server started");
  });
}
