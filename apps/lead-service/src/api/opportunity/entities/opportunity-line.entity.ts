import { AbstractEntity } from 'apps/lead-service/src/database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Opportunity } from './opportunity.entity';

@Entity('opportunity_lines')
export class OpportunityLine extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  variantId: number;

  @Column({ type: 'int', nullable: true })
  total: number;

  @Column({ type: 'varchar' })
  opportunityId: number;

  @ManyToOne(() => Opportunity, (opportunity) => opportunity.opportunityLines)
  opportunity: Relation<Opportunity>;
}
