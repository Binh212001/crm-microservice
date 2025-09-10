import { Expose, Type } from 'class-transformer';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderLineResDto } from './order-line-res.dto';

export class OrderResDto {
  @Expose()
  id: number;

  @Expose()
  orderNumber: string;

  @Expose()
  customerName: string;

  @Expose()
  customerEmail: string;

  @Expose()
  customerPhone: string;

  @Expose()
  shippingAddress: string;

  @Expose()
  shippingCity: string;

  @Expose()
  shippingCountry: string;

  @Expose()
  shippingPostalCode: string;

  @Expose()
  billingAddress: string;

  @Expose()
  billingCity: string;

  @Expose()
  billingCountry: string;

  @Expose()
  billingPostalCode: string;

  @Expose()
  status: OrderStatus;

  @Expose()
  subtotal: number;

  @Expose()
  taxAmount: number;

  @Expose()
  discountAmount: number;

  @Expose()
  shippingAmount: number;

  @Expose()
  totalAmount: number;

  @Expose()
  notes: string;

  @Expose()
  @Type(() => Date)
  orderDate: Date;

  @Expose()
  @Type(() => Date)
  shippedDate: Date;

  @Expose()
  @Type(() => Date)
  deliveredDate: Date;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose()
  @Type(() => OrderLineResDto)
  orderLines: OrderLineResDto[];
}
