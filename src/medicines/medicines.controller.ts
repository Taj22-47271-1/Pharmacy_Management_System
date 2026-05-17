import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { MedicinesService } from './medicines.service';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) { }

  @Post()
  create(@Body() body: any) {
    return this.medicinesService.create(body);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.medicinesService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.medicinesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinesService.remove(+id);
  }
}