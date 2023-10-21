import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(id: string, user: User): Promise<User> {
        user.id = Number(id);
        return await this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}