import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("access-records", table => {
    table.increments();
    table.string("description").notNullable();
    table.string("apartment_number").notNullable();
    table.string("beach_umbrella").notNullable();
    table.string("user_id").notNullable();

    table.foreign("user_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("acess-records");
}