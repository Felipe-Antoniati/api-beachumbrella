import Router from "express";
import { celebrate, Joi, Segments } from "celebrate";

import accessController from "../controllers/accessController";
const AccessController = new accessController();

const accessRecordRouters = Router();

accessRecordRouters
  .post("/access-records", AccessController.create)
  .get("/access-records", celebrate({
    [Segments.QUERY]:
      Joi.object().keys({
        page: Joi.number(),
      }),
  }), AccessController.index)
  .delete("/access-records/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }), AccessController.delete);

export default accessRecordRouters;
