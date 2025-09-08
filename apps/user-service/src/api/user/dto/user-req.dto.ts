import { PaginationReq } from 'apps/user-service/src/comom/pagination/pagination';
import { IsOptional, IsString } from 'class-validator';

export class UserReqDto extends PaginationReq {
  @IsOptional()
  @IsString()
  fullName?: string;
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  phone?: string;
}
