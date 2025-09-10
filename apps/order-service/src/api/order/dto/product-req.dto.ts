import { IsOptional, IsString } from 'class-validator';
import { PaginationReq } from 'apps/inventory-service/src/comom/pagination/pagination';

export class ProductReqDto extends PaginationReq {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  sku?: string;
  @IsOptional()
  @IsString()
  barcode?: string;
  @IsOptional()
  @IsString()
  categoryId?: string;
}
