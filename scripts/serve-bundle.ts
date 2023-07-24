/* eslint-disable no-console */
import * as fs from "fs/promises";
import { createServer } from "https";

import { program } from "commander";
import { LOCALHOST_CERT_PATH, LOCALHOST_KEY_PATH } from "consts";
import * as express from "express";

program.requiredOption("-b, --buildDirPath <string>");
program.parse();
const options = program.opts();

(async (): Promise<void> => {
  const { buildDirPath } = options;

  console.log("Creating express app...");
  const app = express();

  app.get("/", (_, res) => {
    res.send("This is from express.js");
  });

  app.use(express.static(buildDirPath as string));

  console.log("Reading ssl certificate...");
  const cert = await fs.readFile(LOCALHOST_CERT_PATH);
  const key = await fs.readFile(LOCALHOST_KEY_PATH);

  console.log("Creating server...");

  const server = createServer({ key, cert }, app);

  console.log("Starting server...");
  server.listen(3000, () => {
    console.log("Https server started on port 'https://localhost:3000'");
  });
})().catch((e) => console.log("FAILED with error:", e));
