import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Lead } from './lead.entity';

@Entity('lead_lines')
export class LeadLine extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  productId: number;
  @Column({ type: 'int', default: 1 })
  quantity: number;
  @ManyToOne(() => Lead, (lead) => lead.leadLines)
  lead: Relation<Lead>;
}
