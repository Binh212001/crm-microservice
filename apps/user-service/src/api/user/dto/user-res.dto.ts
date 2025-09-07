import { Expose } from 'class-transformer';
import { Role } from '../enums/role';
import { IsArray, IsEnum } from 'class-validator';

export class UserResDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @IsArray()
  @IsEnum(Role, { each: true })
  role: Role[];
  @Expose()
  status: string;
  @Expose()
  phone: string;
  @Expose()
  address: string;
  @Expose()
  avatar: string;
  @Expose()
  gender: string;
  @Expose()
  birthDate: string;
  @Expose()
  city: string;
  @Expose()
  country: string;
  @Expose()
  postalCode: string;
  @Expose()
  company: string;
  @Expose()
  department: string;
  @Expose()
  position: string;
  @Expose()
  manager: string;
  @Expose()
  managerEmail: string;
  @Expose()
  managerPhone: string;
}
