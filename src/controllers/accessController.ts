import { Request, Response } from "express";
import knex from "../database/connection";

export default class accessController {
  async create(req: Request, res: Response) {
    const {
      description, apartment_number, beach_umbrella
    } = req.body;

    const user_id = req.headers.authorization;

    const [id] = await knex("access-records").insert({
      description,
      apartment_number,
      beach_umbrella,
      user_id,
    });

    return res.json({ id });
  }

  async index(req: Request, res: Response) {
    const { page } = req.query;
    const [count] = await knex("access-records").count();

    const accessRecords = await knex("access-records")
      .limit(5)
      .offset((<any>page - 1) * 5)
      .select(
        "id",
        "description", 
        "apartment_number", 
        "beach_umbrella"
      );

    res.header("X-Total-Count", <any>count["count(*)"]);

    return res.json({ accessRecords });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const incident = await knex("access-records")
      .where("id", id)
      .select("user_id")
      .first();
    if (incident.user_id !== user_id) {
      return res.status(401).json({
        error: "Operation Unauthorized! Try again.",
      });
    }

    await knex("access-records")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
}