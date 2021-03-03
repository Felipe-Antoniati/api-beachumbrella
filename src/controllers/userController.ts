import { Request, Response } from "express";
import crypto from "crypto";
import knex from "../database/connection";

export default class userController {
  async create(req: Request, res: Response) {
    const {
      name, email, whatsapp, password
    } = req.body;
    const id = crypto.randomBytes(3).toString("hex");
    try {
      const userEmail = await knex("users")
        .where("email", email)
        .select("email");
      if (userEmail === email) {
        res.status(401).json({
          message:
            "A user with this email already exists"
        })
      } else {
        await knex("users").insert({
          id,
          name,
          email,
          whatsapp,
          password
        });

        return res.status(201).json({ id });
      };
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    };
  };

  async index(req: Request, res: Response) {
    try {
      const users = await knex("users")
        .select("name", "email", "whatsapp",);
      return res.json({ users });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  };
};
