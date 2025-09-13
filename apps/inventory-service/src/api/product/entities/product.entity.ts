import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ProductType } from '../enums/product-type.enum';
import { ProductVariant } from './product-variant.entity';
import { FileResDto } from 'apps/inventory-service/src/comom/attachments/file.res';

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  sku: string;
  @Column({ type: 'varchar' })
  barcode: string;

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
  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product, {
    eager: true,
  })
  variants: Relation<ProductVariant>[];

  @Column({ type: 'jsonb', nullable: true })
  image: FileResDto;
}
