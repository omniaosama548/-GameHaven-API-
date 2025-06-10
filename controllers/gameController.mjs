import { fetchGameById, fetchGames } from "../services/gameService.mjs";
import AppError from "../utils/appError.mjs";
import catchAsync from "../utils/catchAsync.mjs";

export const getGames = catchAsync(async (req, res, next) => {
  const games = await fetchGames(req.query);
  if (!games)
    return next(
      new AppError("somthing went wrong, please try again later", 500)
    );

  res.json(games);
});

export const getGameById = catchAsync(async (req, res, next) => {
  const game = await fetchGameById(req.params.id);
  if (!game) return next(new AppError("Game not found", 404));
  res.json(game);
});
