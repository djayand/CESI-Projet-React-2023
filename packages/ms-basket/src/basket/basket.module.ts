import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket } from './entities/Basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basket])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
