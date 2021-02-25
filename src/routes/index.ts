import { Router } from "express";
const routesRouters = Router();

import UsersRouters from "./users";
import AccessRecordRouters from "./access-records";

routesRouters
  .use("/", UsersRouters)
  .use("/", AccessRecordRouters)
;

export default routesRouters;