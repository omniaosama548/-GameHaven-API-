import request from "supertest";
import { describe, it, before } from "mocha";
import { strict as assert } from "assert";
import app from "../app.mjs";
import connectDB from "../config/db.mjs";

let token;
let createdReviewId;
let testGameId = "68484b29730f11ec72f99132";

describe("Review Endpoints", function () {
  this.timeout(10000);

  before(async () => {
    await connectDB();

    const res = await request(app).post("/api/auth/login").send({
      email: "omnia123@gmail.com", // admin user
      password: "123456",
    });

    console.log("LOGIN RESPONSE STATUS:", res.status);
    console.log("LOGIN RESPONSE BODY:", res.body);

    token = `Bearer ${res.body.token}`;
  });

  it("POST /api/reviews => should create a review", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        gameId: testGameId,
        rating: 4,
        comment: "Great game!",
      });

    console.log("CREATE REVIEW RESPONSE BODY:", res.body); 

    assert.equal(res.status, 201);
    assert.equal(res.body.review.rating, 4);
    createdReviewId = res.body.review._id;
  });

  it("GET /api/reviews/game/:gameId => should return game reviews", async () => {
    const res = await request(app).get(`/api/reviews/game/${testGameId}`);

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body), "Expected an array of reviews");
  });

  it("PATCH /api/reviews/:reviewId => should update a review", async () => {
    const res = await request(app)
      .patch(`/api/reviews/${createdReviewId}`)
      .set("Authorization", token)
      .send({
        rating: 5,
        comment: "Actually it's amazing!",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.updated.rating, 5);
  });

  it("DELETE /api/reviews/:reviewId => should delete a review", async () => {
    const res = await request(app)
      .delete(`/api/reviews/${createdReviewId}`)
      .set("Authorization", token);

    assert.equal(res.status, 200);
    assert.ok(
      res.body.message.toLowerCase().includes("deleted"),
      "Expected message to mention 'deleted'"
    );
  });
});

