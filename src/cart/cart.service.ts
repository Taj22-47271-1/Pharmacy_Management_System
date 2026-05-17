import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const medicine = await this.medicineRepository.findOne({
      where: { id: dto.medicineId },
    });

    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    const existingCart = await this.cartRepository.findOne({
      where: {
        user: { id: userId },
        medicine: { id: dto.medicineId },
      },
      relations: ['user', 'medicine'],
    });

    if (existingCart) {
      existingCart.quantity += dto.quantity;
      return this.cartRepository.save(existingCart);
    }

    const cart = this.cartRepository.create({
      user: user!,
      medicine,
      quantity: dto.quantity,
    });

    return this.cartRepository.save(cart);
  }

  async getMyCart(userId: number) {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['medicine'],
    });
  }

  async updateQuantity(userId: number, cartId: number, quantity: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['user'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.user.id !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeCartItem(userId: number, cartId: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['user'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.user.id !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    await this.cartRepository.remove(cartItem);

    return { message: 'Cart item removed' };
  }
}