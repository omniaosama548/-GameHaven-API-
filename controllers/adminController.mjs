import * as gameService from "../services/gameService.mjs";
import catchAsync from "../utils/catchAsync.mjs";

export const createGame = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (req.file) {
    data.coverImage = `/uploads/${req.file.filename}`;
  }
  const game = await gameService.createGame(data);
  if (!game)
    return next(
      new AppError("somthing went wrong, please try again later", 500)
    );

  res.status(201).json(game);
});

export const updateGame = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (req.file) {
    data.coverImage = `/uploads/${req.file.filename}`;
  }
  const updated = await gameService.updateGame(req.params.id, data);
  if (!updated)
    return next(
      new AppError("somthing went wrong, please try again later", 500)
    );

  res.json(updated);
});

export const deleteGame = catchAsync(async (req, res, next) => {
  await gameService.deleteGame(req.params.id);
  res.json({ message: "Game deleted" });
});
