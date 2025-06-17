import request from "supertest";
import { describe, it, before } from "mocha";
import { strict as assert } from "assert";
import app from "../app.mjs";
import connectDB from "../config/db.mjs";

let token;

describe("Order Endpoints", function () {
  this.timeout(10000);

  before(async () => {
    await connectDB();

    const res = await request(app).post("/api/auth/login").send({
      email: "omnia123@gmail.com",
      password: "123456",
    });

    token = `Bearer ${res.body.token}`;
  });

  it("STEP: Add game to cart before placing an order", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", token)
      .send({ gameId: "68484b29730f11ec72f9912f" }); // The Witcher 3 ID

    assert.equal(res.status, 200);
    assert.ok(res.body.message.toLowerCase().includes("added"));
  });

  it("POST /api/orders => should place an order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", token);

    console.log("PLACE ORDER RESPONSE:", res.body);

    assert.equal(res.status, 201);
    assert.ok(res.body.message.toLowerCase().includes("success"));
    assert.ok(res.body.order);
    assert.ok(Array.isArray(res.body.order.items), "Expected order.items to be an array");
  });

  it("GET /api/orders => should return user orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", token);

    console.log("GET USER ORDERS RESPONSE:", res.body);

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body), "Expected an array of orders");
  });
});

