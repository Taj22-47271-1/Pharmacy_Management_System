import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Medicine } from './medicine.entity';
import { Supplier } from '../suppliers/supplier.entity';

import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Supplier])],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}