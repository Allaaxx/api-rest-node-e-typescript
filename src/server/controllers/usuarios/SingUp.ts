import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";

interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const singUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    senha: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  })),

}));

export const singUp = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<Response> => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    if (result.message.includes('UNIQUE constraint failed: usuarios.email')) {
      return res.status(StatusCodes.CONFLICT).json({
        errors: { default: 'Email já cadastrado.' },
      });
    }
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};