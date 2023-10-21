import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';

@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    // TODO : Fix type problem
    /* @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return await this.userRepository.findOne(+id);
    } */

    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
        user.id = Number(id);
        return await this.userRepository.save(user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
