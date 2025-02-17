import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' >  { }

export const singInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),
  })),
}));

export const singIn = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
  const { email, senha } = req.body;
  
  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    }); 
    return; 
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    });
    return; 
  }

  res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste'});
  return; 
};
