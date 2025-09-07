import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'varchar' })
  birthDate: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  postalCode: string;

  @Column({ type: 'varchar' })
  company: string;

  @Column({ type: 'varchar' })
  department: string;

  @Column({ type: 'varchar' })
  position: string;

  @Column({ type: 'varchar' })
  manager: string;

  @Column({ type: 'varchar' })
  managerEmail: string;

  @Column({ type: 'varchar' })
  managerPhone: string;

  @Column({
    type: 'varchar',
    array: true,
    default: [
      Role.ADMIN,
      Role.SALES,
      Role.MARKETING,
      Role.ACCOUNTING,
      Role.HR,
      Role.IT,
      Role.OTHERS,
    ],
  })
  role: Role[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password && this.password.length > 0) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
