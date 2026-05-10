import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Medicine } from './medicine.entity';
import { Supplier } from '../suppliers/supplier.entity';

import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepo: Repository<Medicine>,

    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
  ) {}

  async create(dto: CreateMedicineDto) {
    const supplier = await this.supplierRepo.findOne({
      where: { id: dto.supplierId },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    const medicine = this.medicineRepo.create({
      name: dto.name,
      category: dto.category,
      price: dto.price,
      quantity: dto.quantity,
      expiryDate: dto.expiryDate,
      supplier,
    });

    return this.medicineRepo.save(medicine);
  }

  findAll() {
    return this.medicineRepo.find({
      relations: ['supplier'],
      order: { id: 'DESC' },
    });
  }

  searchByName(name: string) {
    return this.medicineRepo.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: ['supplier'],
    });
  }

  lowStock() {
    return this.medicineRepo
      .createQueryBuilder('medicine')
      .leftJoinAndSelect('medicine.supplier', 'supplier')
      .where('medicine.quantity <= :quantity', { quantity: 10 })
      .getMany();
  }

  async findOne(id: number) {
    const medicine = await this.medicineRepo.findOne({
      where: { id },
      relations: ['supplier'],
    });

    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    return medicine;
  }

  async update(id: number, dto: UpdateMedicineDto) {
    const medicine = await this.findOne(id);

    if (dto.supplierId) {
      const supplier = await this.supplierRepo.findOne({
        where: { id: dto.supplierId },
      });

      if (!supplier) {
        throw new NotFoundException('Supplier not found');
      }

      medicine.supplier = supplier;
    }

    medicine.name = dto.name ?? medicine.name;
    medicine.category = dto.category ?? medicine.category;
    medicine.price = dto.price ?? medicine.price;
    medicine.quantity = dto.quantity ?? medicine.quantity;
    medicine.expiryDate = dto.expiryDate ?? medicine.expiryDate;

    return this.medicineRepo.save(medicine);
  }

  async remove(id: number) {
    const medicine = await this.findOne(id);
    await this.medicineRepo.remove(medicine);

    return {
      message: 'Medicine deleted successfully',
    };
  }
}