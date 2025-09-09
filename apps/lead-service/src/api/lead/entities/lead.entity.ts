import { AbstractEntity } from '../../../database/entities/abstract.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { LeadStatus } from '../enums/lead-status';
import { Opportunity } from '../../opportunity/entities/opportunity.entity';
import { LeadLine } from './lead-line.entity';

@Entity('leads')
export class Lead extends AbstractEntity {
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

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @OneToMany(() => LeadLine, (leadLine) => leadLine.lead, { eager: true })
  leadLines: Relation<LeadLine>[];

  @OneToMany(() => Opportunity, (opportunity) => opportunity.lead)
  opportunities: Relation<Opportunity>[];
}
