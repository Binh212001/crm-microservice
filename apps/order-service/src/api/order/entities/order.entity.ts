import { AbstractEntity } from '../../../database/entities/abstract.entity';
import {
  Column,
  Entity,
  BeforeInsert,
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

  @Column({ type: 'int' })
  customerId: number;
  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 255 })
  customerEmail: string;

  @Column({ type: 'varchar', length: 20 })
  customerPhone: string;

  @Column({ type: 'text', nullable: true })
  shippingAddress: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  shippingCity: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  shippingCountry: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  shippingPostalCode: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
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
  @BeforeInsert()
  generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
}
