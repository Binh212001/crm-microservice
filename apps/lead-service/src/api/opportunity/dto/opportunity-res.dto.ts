import { Expose, Type } from 'class-transformer';
import { OpportunityStatus } from '../enums/opportunity-status';
import { ProductResDto } from 'apps/inventory-service/src/api/product/dto/product-res.dto';

export class OpportunityResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

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

  @Expose()
  status: OpportunityStatus;

  @Expose()
  leadId: number;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose()
  @Type(() => ProductResDto)
  product: ProductResDto;
}
