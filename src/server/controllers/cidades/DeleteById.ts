import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CidadesProvider } from '../../database/providers/cidades';
import { validation } from '../../shared/middlewares';

interface IParamProps {
  id: number;  
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0), 
  })),
}));

export const deleteById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: { default: 'ID inválido' }
      });
      return;
    }

    const result = await CidadesProvider.deleteById(id);

    if (result instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message }
      });
      return;
    }

    res.status(StatusCodes.NO_CONTENT).send(); 

  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Erro ao apagar o registro' }
    });
  }
};