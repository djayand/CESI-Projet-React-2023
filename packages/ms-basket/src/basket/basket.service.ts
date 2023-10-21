import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from './entities/Basket.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,
  ) {}

  // POST - +1 Menu in the Basket
  create(createBasketDto: Basket) {
    const basket = this.basketRepository.create(createBasketDto);
    return this.basketRepository.save(basket);
  }

  // GET - All Menus in the basket
  findAll() {
    return this.basketRepository.find();
  }

  // GET - All Menus in the basket for 1 user
  findAllByUser(userId: string) {
    return this.basketRepository.find({
      where: { userId: userId as unknown as string },
    });
  }

  // GET - 1 Menu un the basket by ID
  findOne(id: string) {
    return this.basketRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // DELETE - 1 Menu in the basket by ID
  remove(id: string) {
    return this.basketRepository.delete(id);
  }
}
