import { Customer } from './../../../../customer-service/src/api/customer/entities/customer.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, Like, Between } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderReqDto } from './dto/order-req.dto';
import { OrderResDto } from './dto/order-res.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { OrderRepository } from './repositories/order.repository';
import { OrderLineRepository } from './repositories/order-line.repository';
import { OrderLine } from './entities/order-line.entity';
import { Transactional } from 'typeorm-transactional';
import { Opportunity } from 'apps/lead-service/src/api/opportunity/entities/opportunity.entity';
import { OpportunityLine } from 'apps/lead-service/src/api/opportunity/entities/opportunity-line.entity';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderLineRepository: OrderLineRepository,
    @Inject('CUSTOMER_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  }

  private calculateOrderTotals(orderLines: any[]): {
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
  } {
    let subtotal = 0;
    let taxAmount = 0;
    let discountAmount = 0;

    orderLines.forEach((line) => {
      const lineTotal = line.quantity * line.unitPrice;
      const lineDiscount = (lineTotal * (line.discountPercentage || 0)) / 100;
      const lineTax = line.taxAmount || 0;

      subtotal += lineTotal;
      discountAmount += lineDiscount;
      taxAmount += lineTax;
    });

    const totalAmount = subtotal - discountAmount + taxAmount;

    return {
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
    };
  }

  @Transactional()
  async create(dto: CreateOrderDto): Promise<Order> {
    if (!dto.orderLines || dto.orderLines.length === 0) {
      throw new BadRequestException('Order must have at least one order line');
    }

    const orderNumber = this.generateOrderNumber();
    const totals = this.calculateOrderTotals(dto.orderLines);

    const order = this.orderRepository.create({
      ...dto,
      orderNumber,
      status: dto.status || OrderStatus.DRAFT,
      orderDate: new Date(),
      ...totals,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order lines
    const orderLines = dto.orderLines.map((lineDto) => {
      const lineTotal = lineDto.quantity * lineDto.price;

      return this.orderLineRepository.create({
        ...lineDto,
        order: savedOrder,
        total: lineTotal,
      });
    });

    await this.orderLineRepository.save(orderLines);

    return savedOrder;
  }

  async findAll(req: OrderReqDto): Promise<PaginationResponse<OrderResDto>> {
    const {
      page,
      limit,
      order,
      orderNumber,
      customerName,
      customerEmail,
      status,
      startDate,
      endDate,
    } = req;
    const where: FindOptionsWhere<Order> = {};

    if (orderNumber) {
      where.orderNumber = Like(`%${orderNumber}%`);
    }

    if (customerEmail) {
      where.customerEmail = Like(`%${customerEmail}%`);
    }

    if (customerName) {
      where.customerName = Like(`%${customerName}%`);
    }

    if (status) {
      where.status = status;
    }

    if (startDate && endDate) {
      where.orderDate = Between(startDate, endDate);
    }

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.orderRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });

    const orderResDto = data.map((order) =>
      plainToInstance(OrderResDto, order),
    );

    return plainToInstance(PaginationResponse<OrderResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: orderResDto,
    });
  }

  async findOne(id: number): Promise<OrderResDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return plainToInstance(OrderResDto, order);
  }

  async updateStatus(
    id: number,
    status: OrderStatus,
  ): Promise<UpdateDeleteResDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Update status and set relevant dates
    order.status = status;
    if (status === OrderStatus.SHIPPED && !order.shippedDate) {
      order.shippedDate = new Date();
    }
    if (status === OrderStatus.DELIVERED && !order.deliveredDate) {
      order.deliveredDate = new Date();
    }

    const savedOrder = await this.orderRepository.save(order);
    return plainToInstance(UpdateDeleteResDto, { id: savedOrder.id });
  }

  async createFromOpportunity(opportunity: Opportunity): Promise<Order> {
    const customer = await firstValueFrom(
      this.clientProxy.send(
        { cmd: 'create_customer', queue: 'CUSTOMER_QUEUE' },
        opportunity,
      ),
    );
    const order = this.orderRepository.create({
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: opportunity.email,
      customerPhone: opportunity.phone,
      shippingAddress: opportunity.address,
      shippingCity: opportunity.city,
      shippingCountry: opportunity.country,
      shippingPostalCode: opportunity.postalCode,
      billingAddress: opportunity.address,
      billingCity: opportunity.city,
      billingCountry: opportunity.country,
      billingPostalCode: opportunity.postalCode,
      status: OrderStatus.DRAFT,
    });
    const savedOrder = await this.orderRepository.save(order);
    await this.orderLineRepository.save(
      opportunity.opportunityLines.map((line: OpportunityLine) => {
        return this.orderLineRepository.create({
          ...line,
          order: savedOrder,
        });
      }),
    );
    return savedOrder;
  }
}
