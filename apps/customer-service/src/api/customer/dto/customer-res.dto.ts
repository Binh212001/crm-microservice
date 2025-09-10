import { Expose } from 'class-transformer';

export class CustomerResDto {
  @Expose()
  id!: number;
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phone?: string;
  @Expose()
  company?: string;
  @Expose()
  address?: string;
}
