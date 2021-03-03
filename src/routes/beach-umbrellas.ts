import Router from "express";

import totalController from "../controllers/totalController";
const TotalController = new totalController();

const totalBeachUmbrellasRouters = Router();

totalBeachUmbrellasRouters
  .post("/beach-umbrellas", TotalController.create)
  .get("/beach-umbrellas", TotalController.index);

export default totalBeachUmbrellasRouters;
