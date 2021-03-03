import { Request, Response } from "express";
import knex from "../database/connection";

export default class totalController {

  async create(req: Request, res: Response) {
    const { total } = req.body;
    const user_id = req.headers.authorization;

    try {
      if (user_id === "") {
        res.status(400).json({
          message:
            "access ID is required",
        });
      } else {
        await knex("beach-umbrellas")
          .insert({
            total,
            user_id
          });
        return res.json({ total });
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };

  async index(req: Request, res: Response) {
    const user_id = req.headers.authorization;
    try {
      if (user_id === "") {
        res.status(400).json({
          message:
            "access ID is required",
        });
      } else {
        const totalBeachUmbrellas = await knex("beach-umbrellas")
          .where("user_id", user_id)
          .select("total");

        return res.json({
          totalBeachUmbrellas
        });
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };
};
