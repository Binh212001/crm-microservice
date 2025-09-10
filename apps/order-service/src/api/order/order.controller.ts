import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderReqDto } from './dto/order-req.dto';
import { OrderResDto } from './dto/order-res.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async create(@Body(ValidationPipe) dto: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(dto);
  }

  @Get()
  async findAll(
    @Query() req: OrderReqDto,
  ): Promise<PaginationResponse<OrderResDto>> {
    return await this.orderService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderResDto> {
    return await this.orderService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: OrderStatus,
  ): Promise<UpdateDeleteResDto> {
    return await this.orderService.updateStatus(id, status);
  }
}
