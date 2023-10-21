import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './ms-auth.controller';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './ms-auth.pb';
import { AuthService } from './ms-auth.service';
import {join} from "path";

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: AUTH_SERVICE_NAME,
                // Définition du transport gRPC au lieu de TCP
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:50051',
                    package: AUTH_PACKAGE_NAME,
                    protoPath: 'node_modules/ProjetA4_Proto/proto/auth.proto',
                },
            },
        ]),
    ],
    // Définition des controller et du service
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}