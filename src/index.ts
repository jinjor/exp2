import { start } from "./server";

start(3000).catch(e => {
  console.log(e);
  process.exit(1);
});
