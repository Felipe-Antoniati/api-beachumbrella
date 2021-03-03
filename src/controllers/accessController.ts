import { Request, Response } from "express";
import knex from "../database/connection";

export default class accessController {

  async create(req: Request, res: Response) {
    const {
      description, apartment_number, beach_umbrella
    } = req.body;
    const user_id = req.headers.authorization;
    try {
      if (user_id === "") {
        return res.json({
          message:
            "access ID is required",
        });
      } else {
        const [id] = await knex("access-records")
          .insert({
            description,
            apartment_number,
            beach_umbrella,
            user_id,
          });
        return res.json({ id });
      }
    } catch (err) {
      res.status(500).json({
        error: err
      });
    };
  };

  async index(req: Request, res: Response) {
    const { page } = req.query;
    const user_id = req.headers.authorization;
    const [count] = await knex("access-records").count();
    try {
      if (user_id === "") {
        return res.json({
          message:
            "access ID is required",
        });
      } else {
        const accessRecords = await knex("access-records")
          .limit(5)
          .offset((<any>page - 1) * 5)
          .select(
            "id",
            "description",
            "apartment_number",
            "beach_umbrella"
          );
        res.header("X-Total-Count",
          <any>count["count(*)"]
        );
        return res.json({
          accessRecords
        });
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.headers.authorization;
    try {
      if (user_id === "") {
        return res.status(400).json({
          message:
            "access ID is required",
        });
      } else {
        const record = await knex("access-records")
          .where("id", id)
          .select("user_id")
          .first();
        if (record.user_id !== user_id) {
          return res.status(401).json({
            error:
              "Operation Unauthorized",
          });
        };
        await knex("access-records")
          .where("id", id)
          .delete();
        return res.status(204).send();
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };
};
