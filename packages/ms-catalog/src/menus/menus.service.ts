import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/Menu.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  // POST - +1 Menu
  create(createMenuDto: Menu) {
    const menu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  // GET - All Menus
  findAll() {
    return this.menuRepository.find();
  }

  // GET - 1 Menu by ID
  findOne(id: string) {
    return this.menuRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // PATCH - 1 Menu by ID
  async update(id: string, updateMenuDto: Partial<Menu>) {
    await this.menuRepository.update(id, updateMenuDto);
    return this.menuRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // DELETE - 1 Menu by ID
  remove(id: string) {
    return this.menuRepository.delete(id);
  }
}
