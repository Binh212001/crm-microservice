import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationReq } from '../../../comom/pagination/pagination';

export class CustomerReqDto extends PaginationReq {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
