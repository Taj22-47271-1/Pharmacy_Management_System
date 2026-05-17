import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CartService } from './cart.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { AddCartDto } from './dto/add-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(@Req() req: any, @Body() dto: AddCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyCart(@Req() req: any) {
    return this.cartService.getMyCart(req.user.id);
  }
}