import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

import { Order } from './entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Medicine } from '../medicines/entities/medicine.entity';
import { User } from '../users/entities/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Medicine, User]),
    JwtModule.register({
      secret: 'secretKey',
    }),
    MailModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }