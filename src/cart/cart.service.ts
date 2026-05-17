import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { Medicine } from '../medicines/entities/medicine.entity';

import { AddCartDto } from './dto/add-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) { }

  async addToCart(userId: number, dto: AddCartDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const medicine = await this.medicineRepository.findOne({
      where: { id: dto.medicineId },
    });

    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    const cart = this.cartRepository.create({
      user: user!,
      medicine,
      quantity: dto.quantity,
    });

    await this.cartRepository.save(cart);

    return {
      message: 'Medicine added to cart',
      cart,
    };
  }

  async getMyCart(userId: number) {
    return this.cartRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['medicine'],
    });
  }
}