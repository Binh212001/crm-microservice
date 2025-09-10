import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerReqDto } from './dto/customer-req.dto';
import { CustomerResDto } from './dto/customer-res.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const existed = await this.customerRepository.findOne({
      where: { email: dto.email },
    });
    if (existed) {
      throw new ConflictException(
        `Customer with email ${dto.email} already exists`,
      );
    }
    const customer = this.customerRepository.create({ ...dto });
    return await this.customerRepository.save(customer);
  }

  async findAll(
    customerReqDto: CustomerReqDto,
  ): Promise<PaginationResponse<CustomerResDto>> {
    const { page, limit, order, name, email, phone } = customerReqDto;
    const where: FindOptionsWhere<Customer> = {};
    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (phone) where.phone = Like(`%${phone}%`);

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.customerRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });
    return plainToInstance(PaginationResponse<CustomerResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: plainToInstance(CustomerResDto, data),
    });
  }

  async findOne(id: number): Promise<CustomerResDto> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);
    return plainToInstance(CustomerResDto, customer);
  }

  async update(
    id: number,
    dto: UpdateCustomerDto,
  ): Promise<UpdateDeleteResDto> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);

    if (dto.email && dto.email !== customer.email) {
      const existed = await this.customerRepository.findOne({
        where: { email: dto.email },
      });
      if (existed) {
        throw new ConflictException(
          `Customer with email ${dto.email} already exists`,
        );
      }
    }
    Object.assign(customer, dto);
    const saved = await this.customerRepository.save(customer);
    return plainToInstance(UpdateDeleteResDto, { id: saved.id });
  }

  async remove(id: number): Promise<UpdateDeleteResDto> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);
    await this.customerRepository.remove(customer);
    return plainToInstance(UpdateDeleteResDto, { id: customer.id });
  }

  async createCustomerForOrder(customer: Customer): Promise<Customer> {
    const existed = await this.customerRepository.findOne({
      where: { email: customer.email },
    });
    if (existed) {
      return existed;
    }
    const newCustomer = this.customerRepository.create(customer);
    return await this.customerRepository.save(newCustomer);
  }
}
