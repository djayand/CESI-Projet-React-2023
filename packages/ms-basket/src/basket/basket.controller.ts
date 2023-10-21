import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { Basket } from './entities/Basket.entity';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  create(@Body() createBasketDto) {
    return this.basketService.create(createBasketDto);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(id);
  }

  @Get(':id')
  findAllByUser(@Param('id') id: string) {
    return this.basketService.findAllByUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(id);
  }
}
