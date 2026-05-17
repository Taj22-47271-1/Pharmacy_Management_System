import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) { }

  async create(data: any) {
    const medicine = this.medicineRepository.create(data);
    return this.medicineRepository.save(medicine);
  }

  async findAll(search?: string) {
    if (search) {
      return this.medicineRepository.find({
        where: [
          { name: ILike(`%${search}%`) },
          { category: ILike(`%${search}%`) },
        ],
        order: { id: 'DESC' },
      });
    }

    return this.medicineRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
    });

    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    return medicine;
  }

  async update(id: number, data: any) {
    const medicine = await this.findOne(id);
    Object.assign(medicine, data);
    return this.medicineRepository.save(medicine);
  }

  async remove(id: number) {
    const medicine = await this.findOne(id);
    await this.medicineRepository.remove(medicine);

    return {
      message: 'Medicine deleted successfully',
    };
  }
}