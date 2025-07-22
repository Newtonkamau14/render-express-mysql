import request from "supertest";
import { app } from "../app";

describe("app", () => {
  it("responds with a not found message", (done) => {
    request(app)
      .get("/this-is-not-valid-route")
      .set("Accept", "text/html; charset=utf-8")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(404, done);
  });
});

describe("GET /", () => {
  it("responds with hello world", (done) => {
    request(app)
      .get("/")
      .set("Accept", "text/html; charset=utf-8")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200, "Hello, world!",done);

  });
});
