import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //console.log('SimpleMiddleware: Olá');

    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Douglas',
        sobrenome: 'Santos',
        role: 'admin',
      };
    }

    next();
    // return res.status(404).send({
    //   message: 'Não encontrado',
    //});
  }
}
