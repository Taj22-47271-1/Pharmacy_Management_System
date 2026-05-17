import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  placeOrder(@Req() req: any) {
    return this.ordersService.placeOrder(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-orders')
  getMyOrders(@Req() req: any) {
    return this.ordersService.getMyOrders(req.user.id);
  }
}