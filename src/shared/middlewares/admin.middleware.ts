import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { LevelAcess } from 'src/modules/users/entities/user.entity';

config();
const configService = new ConfigService();
interface CustomJwtPayload extends jwt.JwtPayload {
  exp: number;
  access_level: LevelAcess;
}

@Injectable()
export class ManagerLevelMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Token de autenticação não fornecido',
        });
      }

      const token = req.headers.authorization.split(' ')[1];
      const secretToken = configService.get('SECRET_TOKEN');
      const decodedToken = jwt.verify(token, secretToken) as CustomJwtPayload;
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Token expirado',
        });
      }

      if (decodedToken.access_level !== LevelAcess.ADMIN) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Nível de acesso insuficiente para acessar este recurso',
        });
      }

      next();
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        statusCode: 401,
        message: 'Token inválido ou expirado',
      });
    }
  }
}
