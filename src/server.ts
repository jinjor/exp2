import * as express from "express";
import { DecodeError } from "./decoder";
import { bodyDecoder, paramsDecoder, queryDecoder } from "./data";
import PromiseRouter from "express-promise-router";

type Req = express.Request;
type Res = express.Response;

const router = PromiseRouter();

router.use(express.json());
router.post("/users", async (req: Req, res: Res) => {
  const body = bodyDecoder.run(req.body);
  console.log("body", body);
  res.send({ message: "ok" });
});
router.get("/users/:userId", async (req: Req, res: Res) => {
  const params = paramsDecoder.run(req.params);
  const query = queryDecoder.run(req.query);
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
