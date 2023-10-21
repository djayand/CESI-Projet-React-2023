import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { KitchensService } from './kitchens.service';
import { Kitchen } from './entities/Kitchen.entity';

@Controller('kitchens')
export class KitchensController {
  constructor(private readonly kitchensService: KitchensService) {}

  @Post()
  create(@Body() createKitchenDto) {
    return this.kitchensService.create(createKitchenDto);
  }

  @Get()
  findAll() {
    return this.kitchensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitchenDto: Partial<Kitchen>) {
    return this.kitchensService.update(id, updateKitchenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitchensService.remove(id);
  }
}
