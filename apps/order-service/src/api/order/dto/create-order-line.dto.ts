import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDecimal,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderLineDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsOptional()
  productDescription?: string;

  @IsNumber()
  @IsOptional()
  variantId?: number;

  @IsString()
  @IsOptional()
  variantName?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  unitPrice: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  discountPercentage?: number = 0;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  taxAmount?: number = 0;
}
