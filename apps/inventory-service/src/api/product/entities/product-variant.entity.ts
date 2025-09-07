import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Product } from './product.entity';
import { Attribute } from '../../variant/entities/attribute.entity';
import { Value } from '../../variant/entities/value.entity';

@Entity()
export class ProductVariant extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  attribute: Attribute;

  @Column({ type: 'jsonb' })
  values: Value[];

  @ManyToOne(() => Product, (product) => product.variants)
  product: Relation<Product>;
}
