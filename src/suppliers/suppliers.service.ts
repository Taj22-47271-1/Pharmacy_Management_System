import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
  ) {}

  create(dto: CreateSupplierDto) {
    const supplier = this.supplierRepo.create(dto);
    return this.supplierRepo.save(supplier);
  }

  findAll() {
    return this.supplierRepo.find({
      relations: ['medicines'],
    });
  }

  async findOne(id: number) {
    const supplier = await this.supplierRepo.findOne({
      where: { id },
      relations: ['medicines'],
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }
  async update(id: number, dto: UpdateSupplierDto) {
  const supplier = await this.findOne(id);

  supplier.name = dto.name ?? supplier.name;
  supplier.phone = dto.phone ?? supplier.phone;
  supplier.address = dto.address ?? supplier.address;

  return this.supplierRepo.save(supplier);
}

  async remove(id: number) {
    const supplier = await this.findOne(id);
    await this.supplierRepo.remove(supplier);

    return {
      message: 'Supplier deleted successfully',
    };
  }
}