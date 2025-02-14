import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ETableNames.PESSOAS, table => {
    table.bigIncrements('id').primary().index();
    table.string('nomeCompleto').index().notNullable();
    table.string('email').unique().notNullable();
    
    table.bigInteger('cidadeId')
      .index()
      .notNullable()
      .references('id')
      .inTable(ETableNames.CIDADES)
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      
      table.comment('Tabela para as pessoas do sistemas');
  }).then(() => {
    console.log(`#Tabela ${ETableNames.PESSOAS} criada com sucesso.`);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.PESSOAS).then(() => {
    console.log(`#Tabela ${ETableNames.PESSOAS} excluida com sucesso.`);
  });

}

