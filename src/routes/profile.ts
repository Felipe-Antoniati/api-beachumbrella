import Router from "express";
import { celebrate, Joi, Segments } from "celebrate";

import profileController from "../controllers/profileController";
const ProfileController = new profileController();

const profileRouter = Router();

profileRouter
  // List User Profile
  .get(
    "/profile",
    celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    }),
    ProfileController.index
  );

export default profileRouter;