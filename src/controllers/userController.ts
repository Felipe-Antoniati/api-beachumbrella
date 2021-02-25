import { Request, Response } from "express";
import crypto from "crypto";
import knex from "../database/connection";

export default class userController {
  async create(req: Request, res: Response) {
    const {
      name, email, whatsapp, password
    } = req.body;

    const id = crypto.randomBytes(4).toString("hex");

    await knex("users").insert({
      id,
      name,
      email,
      whatsapp,
      password
    });

    return res.status(201).json({
      message: `Este é seu ID: ${id}`
    });
  };

  async index(req: Request, res: Response) {
    const users = await knex("users").select("*");
    return res.json({ users });
  };
};
