import { fetchGameById, fetchGames } from "../services/gameService.mjs";

export const getGames = async (req, res, next) => {
  try {
    const games = await fetchGames(req.query);
    res.json(games);
  } catch (err) {
    next(err);
  }
};

export const getGameById = async (req, res, next) => {
  try {
    const game = await fetchGameById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    next(err);
  }
};
