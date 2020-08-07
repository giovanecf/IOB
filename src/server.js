const express = require("express");
const server = express();
const {
  pageLanding,
  pagePostService,
  pageWorker,
  savePostService,
} = require("./pages");

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .get("/", pageLanding)
  .get("/find_worker", pageWorker)
  .get("/post_service", pagePostService)
  .post("/save_post_service", savePostService)
  .listen(5500);
