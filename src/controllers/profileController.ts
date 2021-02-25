import { Request, Response } from "express";
import knex from "../database/connection";

export default class profileController {
  async index(req: Request, res: Response) {
    const user_id = req.headers.authorization;

    const allRecords = await knex("access-records")
      .where("user_id", user_id)
      .select("*");

    return res.json(allRecords);
  }
}