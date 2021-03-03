import { Router } from "express";
const routesRouters = Router();

import UsersRouters from "./users";
import ProfileRouters from "./profile";
import SessionsRouters from "./sessions";
import AccessRecordRouters from "./access-records";
import TotalBeachUmbrellasRouters from "./beach-umbrellas";

routesRouters
  .use("/", UsersRouters)
  .use("/", ProfileRouters)
  .use("/", SessionsRouters)
  .use("/", AccessRecordRouters)
  .use("/", TotalBeachUmbrellasRouters)
;

export default routesRouters;