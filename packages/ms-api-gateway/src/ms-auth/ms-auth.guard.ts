import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { ValidateResponse } from './ms-auth.pb';
import { AuthService } from './ms-auth.service';

// Ajout de la propriété user à l'objet Request
declare module "express" {
    export interface Request {
        user: any
    }
}

// Création du guard
@Injectable()
export class AuthGuard implements CanActivate {
    // Injection du service
    @Inject(AuthService)
    public readonly service: AuthService;
    // Définition de la méthode canActivate qui sera appelée à chaque requête
    public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
        const req: Request = ctx.switchToHttp().getRequest();
        const authorization: string = req.headers['authorization'];

        // Si l'entête Authorization n'est pas présent, on renvoie une erreur 401
        if (!authorization) {
            throw new UnauthorizedException();
        }

        const bearer: string[] = authorization.split(' ');

        // Si le token n'est pas présent, on renvoie une erreur 401
        if (!bearer || bearer.length < 2) {
            throw new UnauthorizedException();
        }

        const token: string = bearer[1];

        const { status, userId }: ValidateResponse = await this.service.validate(token);

        req.user = userId;

        // Si le token n'est pas valide, on renvoie une erreur 401
        if (status !== HttpStatus.OK) {
            throw new UnauthorizedException();
        }

        return true;
    }
}