import { AbstractEntity } from 'apps/inventory-service/src/database/entities/abstract.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../enums/role';
import { UserStatus } from '../enums/user-status';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', default: UserStatus.ACTIVE })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', default: false })
  gender: boolean;

  @Column({ type: 'varchar', nullable: true })
  birthDate: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  postalCode: string;

  @Column({ type: 'varchar', nullable: true })
  company: string;

  @Column({ type: 'varchar', nullable: true })
  department: string;

  @Column({ type: 'varchar', nullable: true })
  position: string;

  @Column({ type: 'varchar', nullable: true })
  manager: string;

  @Column({ type: 'varchar', nullable: true })
  managerEmail: string;

  @Column({ type: 'varchar', nullable: true })
  managerPhone: string;

  @Column({
    type: 'varchar',
    array: true,
    default: [
      RoleEnum.ADMIN,
      RoleEnum.SALES,
      RoleEnum.MARKETING,
      RoleEnum.ACCOUNTING,
      RoleEnum.HR,
      RoleEnum.IT,
      RoleEnum.OTHERS,
    ],
  })
  role: RoleEnum[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password && this.password.length > 0) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
