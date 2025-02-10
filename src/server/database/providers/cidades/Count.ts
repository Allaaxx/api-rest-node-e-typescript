import { number } from "yup";
import { ETableNames } from "../../ETableNames";
import {Knex} from "../../knex";

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.CIDADES)
    .where('nome', 'like', `%${filter}%`)
    .count<{ count: number }[]>({ count: '*' });

    const count = result[0]?.count ?? 0;
    
    if ( Number.isInteger(Number(count))) return Number(count);

    return new Error('error ao buscar registro');
  }catch(error){
    console.log(error);
    return new Error('error ao buscar registro');
  }
}