import request from "supertest";
import { describe, it, before } from "mocha";
import { strict as assert } from "assert";
import app from "../app.mjs";
import connectDB from "../config/db.mjs";

let token;

describe("Category Endpoints", function () {
  this.timeout(10000); 

  before(async () => {
    await connectDB(); 

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "omnia123@gmail.com",
        password: "123456",
      });

    console.log("LOGIN RESPONSE STATUS:", res.status);
    console.log("LOGIN RESPONSE BODY:", res.body);

    token = `Bearer ${res.body.token}`;
  });

  it("GET /api/categories => should return all categories", async () => {
    const res = await request(app)
      .get("/api/categories")
      .set("Authorization", token);

    assert.equal(res.status, 200, "Expected status 200");
    assert.ok(Array.isArray(res.body), "Expected response to be an array");
  });

  it("POST /api/categories => should create new category", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", token)
      .send({
        name: "Test Category " + Date.now(),
      });

    assert.equal(res.status, 201, "Expected status 201");
    assert.ok(res.body.name.includes("Test Category"), "Expected name to include 'Test Category'");
  });

  it("GET /api/categories/:id => should return one category by ID", async () => {
    const create = await request(app)
      .post("/api/categories")
      .set("Authorization", token)
      .send({ name: "OneCategory " + Date.now() });

    const id = create.body._id;

    const res = await request(app)
      .get(`/api/categories/${id}`)
      .set("Authorization", token);

    assert.equal(res.status, 200, "Expected status 200");
    assert.equal(res.body._id, id, "Expected the returned ID to match");
  });

  it("PUT /api/categories/:id => should update category name", async () => {
    const create = await request(app)
      .post("/api/categories")
      .set("Authorization", token)
      .send({ name: "ToUpdate " + Date.now() });

    const id = create.body._id;

    const res = await request(app)
      .put(`/api/categories/${id}`)
      .set("Authorization", token)
      .send({ name: "Updated Name " + Date.now() });

   assert.equal(res.status, 200, "Expected status 200");

assert.ok(res.body.message?.toLowerCase().includes("updated"), "Expected message to include 'updated'");

assert.ok(
  res.body.data?.name?.includes("Updated Name"),
  "Expected name to be updated"
);


  });

  it("DELETE /api/categories/:id => should delete a category", async () => {
    const create = await request(app)
      .post("/api/categories")
      .set("Authorization", token)
      .send({ name: "ToDelete " + Date.now() });

    const id = create.body._id;

    const res = await request(app)
      .delete(`/api/categories/${id}`)
      .set("Authorization", token);

   assert.ok([200, 204].includes(res.status), `Expected status 200 or 204 but got ${res.status}`);


  });
});
