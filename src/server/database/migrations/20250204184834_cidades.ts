import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ETableNames.CIDADES, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome', 150).checkLength('<=', 150).index().notNullable();

    table.comment('Tabela para as cidades do sistemas');
  }).then(() => {
    console.log(`#Tabela ${ETableNames.CIDADES} criada com sucesso.`);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.CIDADES).then(() => {
    console.log(`#Tabela ${ETableNames.CIDADES} excluida com sucesso.`);
  });

}

