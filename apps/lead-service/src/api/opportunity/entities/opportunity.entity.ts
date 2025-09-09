import { AbstractEntity } from 'apps/lead-service/src/database/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Lead } from '../../lead/entities/lead.entity';
import { OpportunityStatus } from '../enums/opportunity-status';

@Entity('opportunities')
export class Opportunity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'varchar', length: 20 })
  postalCode: string;

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  department?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  manager?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  managerEmail?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  managerPhone?: string;

  @Column({ type: 'varchar', default: OpportunityStatus.QUALIFIED })
  status: OpportunityStatus;

  @Column({ type: 'varchar' })
  leadId: number;

  @ManyToOne(() => Lead, (lead) => lead.opportunities)
  lead: Relation<Lead>;

  @Column({ type: 'varchar' })
  productId: number;
}
