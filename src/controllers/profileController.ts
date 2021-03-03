import { Request, Response } from "express";
import knex from "../database/connection";

export default class profileController {

  async index(req: Request, res: Response) {
    const user_id = req.headers.authorization
    try {
      if (user_id === "") {
        res.status(400).json({
          message:
            "access ID is required",
        });
      } else {
        const allRecords = await knex("access-records")
          .where("user_id", user_id)
          .select("*");
        return res.json(allRecords);
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };
};