import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MedicinesModule } from './medicines/medicines.module';
import { MailModule } from './mail/mail.module';

import { User } from './users/user.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Medicine } from './medicines/medicine.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Supplier, Medicine],
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    SuppliersModule,
    MedicinesModule,
    MailModule,
  ],
})
export class AppModule {}