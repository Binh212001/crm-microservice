import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OpportunityStatus } from '../enums/opportunity-status';
import { Type } from 'class-transformer';

export class CreateOpportunityDto {
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
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @IsEmail()
  @IsOptional()
  managerEmail?: string;

  @IsString()
  @IsOptional()
  managerPhone?: string;

  @IsEnum(OpportunityStatus)
  @IsOptional()
  status?: OpportunityStatus;

  @IsNumber()
  @IsOptional()
  leadId: number;

  @IsArray()
  @IsOptional()
  @Type(() => CreateOpportunityLineDto)
  opportunityLines: CreateOpportunityLineDto[];
}

export class CreateOpportunityLineDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  variantAttribute: string;

  @IsString()
  @IsOptional()
  variantValue: string;

  @IsNumber()
  @IsOptional()
  total: number;
}
