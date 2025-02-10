import {Knex} from "../../knex";
import { ICidade } from "../../models";
import { ETableNames } from "../../ETableNames";
import { object } from "yup";

export const create = async (cidade: Omit<ICidade , 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.CIDADES).insert(cidade).returning('id');

    if(typeof result === 'object'){
      return result.id;
    }else if (typeof result === 'number'){
      return result;
    }
    return new Error('error ao cadastrar registro');
  }catch(error){
    console.log(error);
    return new Error('error ao cadastrar registro');
  }

 
}

