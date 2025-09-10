import { AbstractEntity } from '../../../database/entities/abstract.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderLine } from './order-line.entity';

@Entity('orders')
export class Order extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 255 })
  customerEmail: string;

  @Column({ type: 'varchar', length: 20 })
  customerPhone: string;

  @Column({ type: 'text' })
  shippingAddress: string;

  @Column({ type: 'varchar', length: 100 })
  shippingCity: string;

  @Column({ type: 'varchar', length: 100 })
  shippingCountry: string;

  @Column({ type: 'varchar', length: 20 })
  shippingPostalCode: string;

  @Column({ type: 'text', nullable: true })
  billingAddress?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  billingCity?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  billingCountry?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  billingPostalCode?: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  shippingAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'timestamp', nullable: true })
  orderDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  shippedDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredDate?: Date;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order, {
    eager: true,
    cascade: true,
  })
  orderLines: Relation<OrderLine>[];
}
