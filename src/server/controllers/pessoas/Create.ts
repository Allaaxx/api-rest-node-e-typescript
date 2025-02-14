import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().email().required(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
  })),

}));

export const create = async (req: Request<{}, {}, IPessoa>, res: Response): Promise<void> => {
  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else {
    res.status(StatusCodes.CREATED).json(result);
  }
};
