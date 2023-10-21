import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from './entities/Kitchen.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class KitchensService {
  constructor(
    @InjectRepository(Kitchen)
    private kitchenRepository: Repository<Kitchen>,
  ) {}

  // POST - +1 Kitchen
  create(createKitchenDto: Kitchen) {
    const kitchen = this.kitchenRepository.create(createKitchenDto);
    return this.kitchenRepository.save(kitchen);
  }

  // GET - All Kitchens
  findAll() {
    return this.kitchenRepository.find();
  }

  // GET - 1 Kitchen by ID
  findOne(id: string) {
    return this.kitchenRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // PATCH - 1 Kitchen by ID
  async update(id: string, updateKitchenDto: Partial<Kitchen>) {
    await this.kitchenRepository.update(id, updateKitchenDto);
    return this.kitchenRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // DELETE - 1 Kitchen by ID
  remove(id: string) {
    return this.kitchenRepository.delete(id);
  }
}
