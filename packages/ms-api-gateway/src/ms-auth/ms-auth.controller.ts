import { Body, Controller, Inject, OnModuleInit, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    AuthServiceClient,
    RegisterResponse,
    RegisterRequest,
    AUTH_SERVICE_NAME,
    LoginRequest,
    LoginResponse,
    ValidateRequest, ValidateResponse
} from './ms-auth.pb';

// Création du controller
@Controller('auth')
export class AuthController implements OnModuleInit {
    private svc: AuthServiceClient;
    // Injection du client gRPC
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc;
    // Initialisation du service
    public onModuleInit(): void {
        this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }
    // Définition des routes
    @Post('register')
    private async register(@Body() payload: RegisterRequest): Promise<Observable<RegisterResponse>> {
        return this.svc.register(payload);
    }

    @Put('login')
    private async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
        return this.svc.login(body);
    }

    @Post('validate')
    private async validate(@Body() body: ValidateRequest): Promise<Observable<ValidateResponse>> {
        return this.svc.validate(body);
    }
}