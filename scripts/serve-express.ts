/* eslint-disable no-console */
import { program } from "commander";
import express = require("express");

program.requiredOption("-b, --buildDirPath <string>");
program.parse();
const options = program.opts();

((): void => {
  const { buildDirPath } = options;

  console.log("Creating express app...");
  const app = express();

  app.get("/", (_, res) => {
    res.redirect("/index.html");
  });

  app.use(express.static(buildDirPath as string));

  console.log("Starting server...");
  app.listen(3000, () => {
    console.log("Express server started on 'http://localhost:3000'");
  });
})();
