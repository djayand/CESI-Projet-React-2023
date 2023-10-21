import {Controller, Inject, Post, OnModuleInit, UseGuards, Req, Get} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderResponse,
    OrderServiceClient,
    ORDER_SERVICE_NAME,
    CreateOrderRequest,
    FindOneResponse,
} from './ms-order.pb';
import { AuthGuard } from '../ms-auth/ms-auth.guard';
import { Request } from 'express';

@Controller('order')
export class OrderController implements OnModuleInit {
    private svc: OrderServiceClient;

    @Inject(ORDER_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createOrder(@Req() req: Request): Promise<Observable<CreateOrderResponse>> {
        const body: CreateOrderRequest = req.body;

        body.userId = <number>req.user;

        return this.svc.createOrder(body);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    private async findOne(@Req() req: Request): Promise<Observable<FindOneResponse>> {
        const id: number = parseInt(req.params.id);

        return this.svc.findOne({id});
    }
}