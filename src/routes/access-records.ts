import Router from "express";
import { celebrate, Joi, Segments } from "celebrate";

import accessController from "../controllers/accessController";
const AccessController = new accessController();

const accessRecordRouters = Router();

accessRecordRouters
  // Create Access Record
  .post("/access-records", AccessController.create)
  // List all Access Records
  .get(
    "/access-records",
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
      }),
    }),
    AccessController.index
  )
  // Destroy Records
  .delete(
    "/incidents/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }),
    AccessController.delete
  );

  export default accessRecordRouters;