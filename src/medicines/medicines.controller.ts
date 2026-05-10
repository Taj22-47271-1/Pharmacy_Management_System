import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Admin Medicines')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medicines')
export class MedicinesController {
  constructor(private medicinesService: MedicinesService) {}

  @Post()
  create(@Body() dto: CreateMedicineDto) {
    return this.medicinesService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get('search')
  search(@Query('name') name: string) {
    return this.medicinesService.searchByName(name);
  }

  @Get('low-stock')
  lowStock() {
    return this.medicinesService.lowStock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedicineDto) {
    return this.medicinesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinesService.remove(+id);
  }
}