import * as gameService from "../services/gameService.mjs";

export const createGame = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.coverImage = `/uploads/${req.file.filename}`;
    }
    const game = await gameService.createGame(data);
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
};

export const updateGame = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.coverImage = `/uploads/${req.file.filename}`;
    }
    const updated = await gameService.updateGame(req.params.id, data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteGame = async (req, res, next) => {
  try {
    await gameService.deleteGame(req.params.id);
    res.json({ message: "Game deleted" });
  } catch (err) {
    next(err);
  }
};
