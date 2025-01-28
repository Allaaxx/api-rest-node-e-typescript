import { Router } from "express";
import { StatusCodes } from "http-status-codes";


const router = Router();


router.get('/', (_, res) => {
  res.send('Servidor rodando com SUCESSO!');
});

router.post('/teste', (req, res) => {
  //console.log(req);
  res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});


export { router };