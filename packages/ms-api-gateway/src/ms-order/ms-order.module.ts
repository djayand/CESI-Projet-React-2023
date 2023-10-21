import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './ms-order.pb';
import { OrderController } from './ms-order.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: ORDER_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:4000',
                    package: ORDER_PACKAGE_NAME,
                    protoPath: 'node_modules/ProjetA4_Proto/proto/order.proto',
                },
            },
        ]),
    ],
    controllers: [OrderController],
})
export class OrderModule {}