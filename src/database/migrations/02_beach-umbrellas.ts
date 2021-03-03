import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("beach-umbrellas", 
  table => {
    table.increments();
    table.string("total").notNullable();
    table.string("user_id").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
    ;
  });
};

export async function down(knex: Knex) {
  return knex.schema.dropTable("beach-umbrellas");
};