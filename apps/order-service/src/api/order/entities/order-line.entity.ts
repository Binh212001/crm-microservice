import { AbstractEntity } from '../../../database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Order } from './order.entity';
import { FileResDto } from 'apps/inventory-service/src/comom/attachments/file.res';

@Entity('order_lines')
export class OrderLine extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'varchar', length: 255 })
  productName: string;

  @Column({ type: 'int', nullable: true })
  variantId?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  variantName?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'jsonb', nullable: true })
  image: FileResDto;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderLines, {
    onDelete: 'CASCADE',
  })
  order: Relation<Order>;
}
