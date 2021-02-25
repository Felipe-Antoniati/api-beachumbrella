import { Request, Response } from "express";
import knex from "../database/connection";

class sessionController {
  async create(req: Request, res: Response) {
    const { id } = req.body;

    const user = await knex("users")
      .where("id", id)
      .select("name") 
      .first();

    if (!user) {
      return res.status(400).json({
        error: "No such User found with this ID",
      });
    }

    return res.json(user);
  }
}

export default sessionController;