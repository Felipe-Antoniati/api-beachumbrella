import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import sessionController from "../controllers/sessionsController";
const SessionController = new sessionController();

const sessionsRouter = Router();

sessionsRouter
  // Create a Session
  .post(
    "/sessions",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    SessionController.create
  );

export default sessionsRouter;