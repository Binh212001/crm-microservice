import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ProductType } from '../enums/product-type.enum';

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'boolean', default: false })
  isSales: boolean;

  @Column({ type: 'boolean', default: false })
  isPurchase: boolean;

  @Column({ type: 'boolean', default: false })
  isExpenses: boolean;
  @Column({ type: 'boolean', default: false })
  isPointOfSale: boolean;

  @Column({ type: 'boolean', default: false })
  isSubscriptions: boolean;

  @Column({ type: 'boolean', default: false })
  isRental: boolean;

  @Column({ type: 'varchar', default: ProductType.GOODS })
  productType: ProductType;

  @Column({ type: 'varchar', default: 0 })
  quantityOnHand: number;

  @Column({ default: 0 })
  salesPrice: number;

  @Column({ default: 0 })
  soldQuantity: number;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    nullable: true,
  })
  category: Relation<Category>;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
