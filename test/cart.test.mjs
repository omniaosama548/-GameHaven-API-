import request from "supertest";
import { describe, it, before } from "mocha";
import { strict as assert } from "assert";
import app from "../app.mjs";
import connectDB from "../config/db.mjs";

let token;
let gameId = "68484b29730f11ec72f9912f"; // The Witcher 3: Wild Hunt

describe("Cart Endpoints", function () {
  this.timeout(20000); // وقت كلي احتياطي

  before(async function () {
    this.timeout(15000); // وقت مخصص لـ before فقط

    await connectDB();

    const res = await request(app).post("/api/auth/login").send({
      email: "omnia123@gmail.com",
      password: "123456",
    });

    token = `Bearer ${res.body.token}`;
    console.log("TOKEN:", token);
  });

  it("POST /api/cart => should add game to cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", token)
      .send({
        gameId,
        quantity: 1,
      });

    console.log("ADD TO CART RESPONSE:", res.body);

    assert.equal(res.status, 200);
    assert.ok(res.body.message.includes("added"));
    assert.ok(res.body.cart);
  });

  it("GET /api/cart => should get the cart for the user", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", token);

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.items) || res.body.games);
  });

  it("DELETE /api/cart/:gameId => should remove game from cart", async () => {
    const res = await request(app)
      .delete(`/api/cart/${gameId}`)
      .set("Authorization", token);

    assert.equal(res.status, 200);
    assert.ok(res.body.message.includes("removed"));
  });
});

