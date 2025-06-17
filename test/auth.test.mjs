import request from "supertest";
import app from "../app.mjs"

describe("Auth Endpoints", () => {

  it("should return 400 if login data is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({});

    if (res.statusCode !== 400) throw new Error("Expected 400 for invalid login");
  });

  it("should return 400 if register data is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({}); // missing name, email, password

    if (res.statusCode !== 400) throw new Error("Expected 400 for invalid register");
  });



});
