import { Router } from "express";
const routesRouters = Router();

import UsersRouters from "./users";
import AccessRecordRouters from "./access-records";
import SessionsRouters from "./sessions";
import ProfileRouters from "./profile";

routesRouters
  .use("/", UsersRouters)
  .use("/", AccessRecordRouters)
  .use("/", SessionsRouters)
  .use("/", ProfileRouters)
;

export default routesRouters;