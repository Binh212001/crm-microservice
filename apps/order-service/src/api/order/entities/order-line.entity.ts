import { AbstractEntity } from '../../../database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  BeforeInsert,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_lines')
export class OrderLine extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  variantId?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  variantAttribute?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  variantValue?: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  total: number;

  @ManyToOne(() => Order, (order) => order.orderLines, {
    onDelete: 'CASCADE',
  })
  order: Relation<Order>;

  @BeforeInsert()
  calculateTotal() {
    this.total = this.price * this.quantity;
  }
}
