import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ETableNames.USUARIOS, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').notNullable().checkLength('>', 3);
    table.string('senha').notNullable().checkLength('>', 6);
    table.string('email').index().notNullable().unique().checkLength('>', 5);

    table.comment('Tabela para os usuários do sistemas');
  }	).then(() => {
    console.log(`#Tabela ${ETableNames.USUARIOS} criada com sucesso.`);
  });
}


export async function down(knex: Knex): Promise<void> {

  return knex.schema.dropTable(ETableNames.USUARIOS).then(() => {
    console.log(`#Tabela ${ETableNames.USUARIOS} excluida com sucesso.`);
  });
}

