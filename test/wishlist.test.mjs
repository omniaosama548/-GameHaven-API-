import request from "supertest";
import { describe, it, before } from "mocha";
import { strict as assert } from "assert";
import app from "../app.mjs";
import connectDB from "../config/db.mjs";

let token;
let testGameId = "68484b29730f11ec72f9912f"; // The Witcher 3
let wishlistId;

describe("Wishlist Endpoints", function () {
  this.timeout(10000);

  before(async () => {
    await connectDB();

    const res = await request(app).post("/api/auth/login").send({
      email: "omnia123@gmail.com",
      password: "123456",
    });

    token = `Bearer ${res.body.token}`;
  });

  it("POST /api/wishlist => should add a game to wishlist", async () => {
    const res = await request(app)
      .post("/api/wishlist")
      .set("Authorization", token)
      .send({ gameId: testGameId });

    assert.equal(res.status, 200);
    assert.equal(res.body.message, "game add successfully");
    assert.equal(res.body.wishlist.gameTitle, "The Witcher 3: Wild Hunt");

    wishlistId = res.body.wishlist._id;
  });

  it("GET /api/wishlist => should get wishlist for logged-in user", async () => {
    const res = await request(app)
      .get("/api/wishlist")
      .set("Authorization", token);

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.games), "Expected games to be an array");

    const foundGame = res.body.games.find((game) => game._id === testGameId);
    assert.ok(foundGame, "Expected game to be in wishlist");
  });

  it("DELETE /api/wishlist => should remove a game from wishlist", async () => {
    const res = await request(app)
      .delete("/api/wishlist")
      .set("Authorization", token)
      .send({ gameId: testGameId });

    assert.equal(res.status, 200);
    assert.equal(
      res.body.data.message,
      "Game has been removed from your wishlist successfully"
    );
  });
});
