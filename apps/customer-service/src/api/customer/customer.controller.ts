import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerReqDto } from './dto/customer-req.dto';
import { CustomerResDto } from './dto/customer-res.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.create(createDto);
  }

  @Get()
  async findAll(
    @Query() reqDto: CustomerReqDto,
  ): Promise<PaginationResponse<CustomerResDto>> {
    return await this.customerService.findAll(reqDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CustomerResDto> {
    return await this.customerService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDto: UpdateCustomerDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.customerService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.customerService.remove(id);
  }

  @MessagePattern({ cmd: 'create_customer', queue: 'CUSTOMER_QUEUE' })
  async createCustomerForOrder(@Payload() customer: any): Promise<Customer> {
    console.log(
      '🚀 ~ CustomerController ~ createCustomerForOrder ~ customer:',
      customer,
    );
    return await this.customerService.createCustomerForOrder(customer);
  }
}
