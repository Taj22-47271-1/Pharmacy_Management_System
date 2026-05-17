import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Medicine } from '../medicines/entities/medicine.entity';
import { User } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailService: MailService,
  ) { }

  async placeOrder(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItems = await this.cartRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['medicine'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const orders: Order[] = [];

    for (const item of cartItems) {
      const medicine = item.medicine;

      if (medicine.quantity < item.quantity) {
        throw new BadRequestException(`${medicine.name} stock is not enough`);
      }

      medicine.quantity = medicine.quantity - item.quantity;
      await this.medicineRepository.save(medicine);

      const order = this.orderRepository.create({
        user,
        medicine,
        quantity: item.quantity,
        totalPrice: Number(medicine.price) * item.quantity,
      });

      const savedOrder = await this.orderRepository.save(order);
      orders.push(savedOrder);
    }

    await this.cartRepository.remove(cartItems);

    try {
      await this.mailService.sendOrderConfirmation(user.email, user.fullName);
    } catch (error) {
      console.log('Email sending failed:', error.message);
    }

    return {
      message: 'Order placed successfully',
      orders,
    };
  }

  async getMyOrders(userId: number) {
    return this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['medicine'],
      order: {
        id: 'DESC',
      },
    });
  }
}