import fetch from "node-fetch";
import * as assert from "assert";
import { start } from "../src/server";

const port = 3000;
const origin = `http://localhost:${port}`;

async function send(method: string, path: string, data: any): Promise<any> {
  console.log(method, path);
  const url = origin + path;
  const options: any = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return fetch(url, options);
}
async function get(path: string): Promise<any> {
  return send("GET", path, null);
}
async function post(path: string, data: any): Promise<any> {
  return send("POST", path, data);
}

describe("test", function() {
  let server: any;
  before(async () => {
    server = await start(port);
  });
  it("body (valid)", async () => {
    const res = await post(`/users`, {
      age: 10,
      name: "foo"
    });
    const data = await res.json();
    console.log(data);
    assert(res.status === 200);
  });
  it("body (invalid)", async () => {
    const res = await post(`/users`, {
      age: 10
    });
    const data = await res.json();
    console.log(data);
    assert(res.status === 400);
  });
  it("params and query (valid)", async () => {
    const res = await get(`/users/1?q=xx`);
    const data = await res.json();
    console.log(data);
    assert(res.status === 200);
  });
  it("params and query (invalid)", async () => {
    const res = await get(`/users/hoge`);
    const data = await res.json();
    console.log(data);
    assert(res.status === 400);
  });
  after(() => {
    if (server) {
      server.close();
    }
  });
});
