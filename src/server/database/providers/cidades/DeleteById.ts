import { ETableNames } from "../../ETableNames";

import {Knex} from "../../knex";

export const deleteById = async (id: number): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.CIDADES)
    .where('id','=', id)
    .del();
   
  if(result > 0) return result;
  

  return new Error('error ao deletar registro');
  }catch(error){
    console.log(error);
    return new Error('error ao deletar registro');
  }
}