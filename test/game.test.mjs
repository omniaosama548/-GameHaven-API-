import request from "supertest";
import { describe, it, before } from "mocha";
import { strict as assert } from "assert";
import app from "../app.mjs";
import connectDB from "../config/db.mjs";

let testGameId = "68484b29730f11ec72f9912f";

describe("Game Endpoints", function () {
  this.timeout(10000);

  before(async () => {
    await connectDB();
  });

  it("GET /api/games => should return list of games", async () => {
    const res = await request(app).get("/api/games");

    console.log("ALL GAMES RESPONSE:", res.body);

    const gamesArray = Array.isArray(res.body) ? res.body : res.body.games;

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(gamesArray), "Expected response to be an array of games");
    assert.ok(gamesArray.length > 0, "Expected at least one game");
    assert.ok(gamesArray[0].title, "Game object should have a title");
  });

  it("GET /api/games/:id => should return a single game", async () => {
  const res = await request(app).get(`/api/games/${testGameId}`);

  console.log("SINGLE GAME RESPONSE:", res.body);

  const game = res.body.game || res.body;

  assert.equal(res.status, 200);
  assert.ok(game.ID, 'Expected game to have ID');

  assert.equal(game.ID, testGameId); 
  assert.ok(game.title, "Expected game to have title");
});


  it("GET /api/games/:id => should return a single game", async () => {
  const res = await request(app).get(`/api/games/${testGameId}`);

  console.log("SINGLE GAME RESPONSE:", res.body);

  const game = res.body;

  assert.equal(res.status, 200);
 assert.ok(game.ID, 'Expected game to have ID');

  assert.equal(game.ID, testGameId);
  assert.ok(game.title, "Expected game to have title");
});

});

