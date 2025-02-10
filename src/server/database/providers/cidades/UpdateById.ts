import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import {Knex} from "../../knex";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.CIDADES)
    .update(cidade)
    .where('id', '=', id);
    
    if(result > 0) return result;

    return new Error('error ao atualizar registro');
  }catch(error){
    console.log(error);
    return new Error('error ao atualizar registro');
  }
}