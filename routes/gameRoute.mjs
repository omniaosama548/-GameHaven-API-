import express from "express";
import { getGames, getGameById } from "../controllers/gameController.mjs";

const gameRouter = express.Router();

gameRouter.get("/", getGames);
gameRouter.get("/:id", getGameById);

export default gameRouter;
