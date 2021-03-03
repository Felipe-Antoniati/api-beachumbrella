import { Request, Response } from "express";
import knex from "../database/connection";

export default class sessionController {
  async create(req: Request, res: Response) {
    const { id } = req.body;
    try {
      if (id === "") {
        res.status(400).json({
          message:
            "acces ID is required"
        })
      } else {
        const user = await knex("users")
          .where("id", id)
          .select("name")
          .first();
        if (!user) {
          return res.status(400).json({
            error:
              "No such User found with this ID",
          });
        };
        return res.json(user);
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };
};
