import { IsOptional, IsString } from 'class-validator';
import { PaginationReq } from 'apps/inventory-service/src/comom/pagination/pagination';

export class VariantReqDto extends PaginationReq {
  @IsOptional()
  @IsString()
  name?: string;
}
