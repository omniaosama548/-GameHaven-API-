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

it('should return 201 for valid registration (mock data)', async function () {
  this.timeout(10000); 
const randomEmail = `test_${Date.now()}@example.com`;

const res = await request(app).post('/api/auth/register').send({
  name: "Test User",
  email: randomEmail,
  password: "123456"
});
  expect(res.status).to.equal(201);
});

});
