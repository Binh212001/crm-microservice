import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { LeadStatus } from '../enums/lead-status';
import { Type } from 'class-transformer';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  postalCode: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @IsOptional()
  @Type(() => LeadLineResDto)
  leadLines: LeadLineResDto[];
}

export class LeadLineResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsOptional()
  quantity: number;
}
