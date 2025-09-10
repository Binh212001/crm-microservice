import { Expose } from 'class-transformer';
import { RoleEnum } from '../enums/role';
import { IsArray, IsEnum } from 'class-validator';

export class UserResDto {
  @Expose()
  id: number;
  @Expose()
  fullName: string;
  @Expose()
  email: string;
  @Expose()
  @IsArray()
  @IsEnum(RoleEnum, { each: true })
  role: RoleEnum[];
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
