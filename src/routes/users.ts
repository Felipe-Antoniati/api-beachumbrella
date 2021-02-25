import Router from "express";
import { celebrate, Joi, Segments } from "celebrate";

import userController from "../controllers/userController";
const UserController = new userController();

const userRouters = Router();

userRouters
  // Create Users
  .post(
    "/users",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
      }),
    }),
    UserController.create
  )
  // List All Users
  .get("/users", UserController.index);

export default userRouters;