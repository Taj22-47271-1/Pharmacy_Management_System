import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { Medicine } from '../medicines/entities/medicine.entity';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Medicine]),
    JwtModule.register({
      secret: 'secretKey',
    }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }