import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { CartModule } from './cart/cart.module';
import { MedicinesModule } from './medicines/medicines.module';
import { OrdersModule } from './orders/orders.module';

import { User } from './users/entities/user.entity';
import { Cart } from './cart/entities/cart.entity';
import { Medicine } from './medicines/entities/medicine.entity';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pharmacy_customer_db',
      entities: [User, Cart, Medicine, Order],
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    MailModule,
    CartModule,
    MedicinesModule,
    OrdersModule,
  ],
})
export class AppModule { }