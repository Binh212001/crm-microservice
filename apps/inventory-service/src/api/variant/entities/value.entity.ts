import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class Value extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  color: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.values)
  attribute: Relation<Attribute>;
}
