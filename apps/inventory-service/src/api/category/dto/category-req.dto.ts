import { PaginationReq } from 'apps/customer-service/src/comom/pagination/pagination';
import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CategoryReqDto extends PaginationReq {
  @IsString()
  @IsOptional()
  name: string;
}
