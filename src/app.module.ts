import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MedicinesModule } from './medicines/medicines.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, UsersModule, MedicinesModule, CartModule, OrdersModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
