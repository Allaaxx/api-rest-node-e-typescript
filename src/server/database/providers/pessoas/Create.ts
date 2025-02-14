import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.CIDADES)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count'); 

    if (Number(count) === 0) { 
      return new Error('Cidade não encontrada');
    }
    
    const [result] = await Knex(ETableNames.PESSOAS).insert(pessoa).returning('id');

    if (typeof result === 'number') {
      return result;
    } else if (typeof result === 'object') {
      return result.id;
    }

    return new Error('Erro ao cadastrar registro');
  } catch (error) {
    console.error('Erro ao cadastrar registro:', error);
    return new Error('Erro ao cadastrar registro');
  }
};
