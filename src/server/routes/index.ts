import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {CidadesController} from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  res.send('Servidor rodando com SUCESSO!');
});

router.post(
  '/cidades', 
  CidadesController.createValidation,
  CidadesController.create
); 

export { router };