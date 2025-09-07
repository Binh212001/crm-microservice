import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product>[];
}
